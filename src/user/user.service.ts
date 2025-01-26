import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcryptjs";
import { Repository } from "typeorm";
import { UserEntity } from "./entities/user.entity";
import { LoginUserDto } from "../auth/dto/login.dto";
import { LoginResponseDto } from "../auth/dto/login-response.dto";
import { UserResponseDto } from "./dto/userResponse.dto";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { OrganizationEntity } from "../organization/entities/organization.entity";
import { FilialEntity } from "../organization/entities/filial.entity";
import { Role } from "./enums/roles.enum";
import { PatientEntity } from "./entities/patient.entity";
import { DoctorEntity } from "./entities/doctor.entity";
import { DocumentEntity } from "../files/entities/document.entity";
import { PatientDataDto } from "./dto/patient-data.dto";
import { DoctorDataDto } from "./dto/doctor-data.dto";
import { MedregistratorEntity } from "./entities/medregistrator.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
    @InjectRepository(OrganizationEntity)
    private organizationsRepository: Repository<OrganizationEntity>,
    @InjectRepository(PatientEntity)
    private patientRepository: Repository<PatientEntity>,
    @InjectRepository(DoctorEntity)
    private doctorRepository: Repository<DoctorEntity>,
    @InjectRepository(DocumentEntity)
    private documentRepository: Repository<DocumentEntity>,
    @InjectRepository(MedregistratorEntity)
    private medregistrarRepository: Repository<MedregistratorEntity>,
    @InjectRepository(FilialEntity)
    private filialRepository: Repository<FilialEntity>,
  ) {}

  findById(id: number): Promise<UserEntity> {
    return this.userRepository.findOne({ where: { user_id: id } });
  }

  async findUserInfoById(id: number) {
    const { password, ...user } = await this.userRepository.findOne({
      where: { user_id: id },
    });
    const patient = await this.patientRepository.findOne({
      where: { user: user },
    });
    const doctor = await this.doctorRepository.findOne({
      where: { user: user },
    });
    const med = await this.medregistrarRepository.findOne({
      where: { user: user },
      relations: { filial: true },
    });

    return {
      userInfo: user,
      patientInfo: patient,
      doctorInfo: doctor,
      filialAddress: med?.filial.address,
    };
  }

  async findSelf(token: string) {
    if (!token) {
      throw new Error("No token provided");
    }
    const decoded = this.jwtService.decode(token).userResult;
    const user = await this.userRepository.findOne({
      where: { userName: decoded.username },
      relations: { organization: true },
    });
    return new UserResponseDto({
      userId: user.user_id,
      role: user.role,
      lastName: user.last_name,
      firstName: user.first_name,
      organizationId: user.organization.org_id,
      patronymic: user.patronymic,
      username: user.userName,
    });
  }

  async signIn(loginDto: LoginUserDto): Promise<LoginResponseDto> {
    const { username, password } = loginDto;
    const user = await this.userRepository.findOne({
      where: { userName: username },
      relations: { organization: true },
    });
    if (user && user.validatePassword(password)) {
      const userResponse = new LoginResponseDto();
      userResponse.userId = user.user_id;
      userResponse.username = user.userName;
      userResponse.organizationId = user.organization.org_id;
      userResponse.firstName = user.first_name;
      userResponse.lastName = user.last_name;
      userResponse.patronymic = user.patronymic;
      userResponse.role = user.role;
      return userResponse;
    } else {
      return null;
    }
  }

  async createUser(createUserDto: CreateUserDto) {
    const {
      username,
      password,
      role,
      lastName,
      firstName,
      patronymic,
      organizationId,
      patientData,
      doctorData,
      filialId,
    } = createUserDto;

    // Проверка существующего пользователя
    const existingUser = await this.userRepository.findOne({
      where: { userName: username },
    });
    if (existingUser) {
      throw new BadRequestException("User already exists");
    }

    // Проверка существования организации
    const organization = await this.organizationsRepository.findOne({
      where: { org_id: organizationId },
    });
    if (!organization) {
      throw new NotFoundException("Organization not exists");
    }

    // Хэширование пароля
    const hashedPassword = await bcrypt.hash(password, 10);

    // Создание пользователя
    const newUser = this.userRepository.create({
      userName: username,
      password: hashedPassword,
      role,
      last_name: lastName,
      first_name: firstName,
      patronymic,
      organization,
    });

    const userToReturn = await this.userRepository.save(newUser);

    // Создание пациента или доктора
    if (role === Role.Patient) {
      if (!patientData) {
        throw new BadRequestException(
          "Patient data is required for role 'Patient'",
        );
      }
      await this.createPatient(patientData, newUser);
    }

    if (role === Role.Doctor) {
      if (!doctorData) {
        throw new BadRequestException(
          "Doctor data is required for role 'Doctor'",
        );
      }
      await this.createDoctor(doctorData, newUser);
    }

    if (role === Role.Medregistrator) {
      if (!filialId) {
        throw new BadRequestException(
          "filialId is required for role 'MedRegistrator'",
        );
      }
      const filial = await this.filialRepository.findOne({
        where: { filial_id: filialId },
      });
      await this.createMedregistrar(newUser, filial);
    }

    // Сохранение пользователя
    return userToReturn;
  }

  private async createPatient(patientData: PatientDataDto, user: UserEntity) {
    const patient = this.patientRepository.create({
      phone_number: patientData.phoneNumber,
      address: patientData.address,
      email: patientData.email,
      gender: patientData.gender,
      birthdate: patientData.birthdate,
      user,
    });
    return await this.patientRepository.save(patient);
  }

  private async createMedregistrar(user: UserEntity, filial: FilialEntity) {
    const med = this.medregistrarRepository.create({
      filial,
      user,
    });
    return await this.medregistrarRepository.save(med);
  }

  private async createDoctor(doctorData: DoctorDataDto, user: UserEntity) {
    const doctor = this.doctorRepository.create({
      work_experience: doctorData.workExperience,
      specialization: doctorData.specialization,
      user,
    });
    await this.doctorRepository.save(doctor);

    const documentPromises = doctorData.documentsLinks.map((docLink) => {
      const document = this.documentRepository.create({
        name: docLink.name,
        link: docLink.link,
        doctor,
      });
      return this.documentRepository.save(document);
    });
    await Promise.all(documentPromises);
  }

  async updateUser(userId: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({
      where: { user_id: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    Object.assign(user, updateUserDto);

    return await this.userRepository.save(user);
  }

  async deleteUser(userId: number) {
    const user = await this.userRepository.findOne({
      where: { user_id: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return await this.userRepository.remove(user);
  }

  async getAllUsers(
    token: string,
    page: number = 1,
    limit: number = 10,
    userType: "employees" | "patients" | "all",
  ) {
    if (!token) {
      throw new Error("No token provided");
    }

    const decoded = this.jwtService.decode(token);
    const userId = decoded?.userResult?.userId;

    if (!userId) {
      throw new Error("Invalid token");
    }

    const skip = (page - 1) * limit;
    const take = limit;

    if (userType === "patients") {
      const [patients, total] = await this.patientRepository.findAndCount({
        skip,
        take,
        relations: { user: true },
      });
      const filteredUsers = patients
        .filter((patient) => patient.user.user_id !== userId)
        .map(({ user }) => user);

      return {
        data: filteredUsers,
        total,
        page,
        totalPages: Math.ceil(total / limit),
      };
    }
    if (userType === "employees") {
      const [users, total] = await this.userRepository.findAndCount({
        relations: {
          organization: true,
        },
        skip,
        take,
      });
      const filteredUsers = users
        .filter(
          (user) =>
            user.user_id !== userId &&
            (user.role === "doctor" || user.role === "medregistrator"),
        )
        .map(({ password, ...rest }) => ({ ...rest }));

      return {
        data: filteredUsers,
        total,
        page,
        totalPages: Math.ceil(total / limit),
      };
    }
    if (userType === "all") {
      const [users, total] = await this.userRepository.findAndCount({
        relations: {
          organization: true,
        },
        skip,
        take,
      });
      const filteredUsers = users
        .filter((user) => user.user_id !== userId)
        .map(({ password, ...rest }) => ({ ...rest }));

      return {
        data: filteredUsers,
        total,
        page,
        totalPages: Math.ceil(total / limit),
      };
    }
  }
}
