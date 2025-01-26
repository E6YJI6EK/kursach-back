import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Request,
  UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "../guards/jwt-auth.guards";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Roles } from "../decorators/role.decorator";
import { Role } from "./enums/roles.enum";
import { ApiParam, ApiQuery } from "@nestjs/swagger";

@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}
  @Post("create-user")
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard)
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
  @Patch("update-user/:id")
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard)
  async updateUser(
    @Param() userId: { id: string },
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(parseInt(userId.id), updateUserDto);
  }
  @Delete("delete-user/:id")
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard)
  async deleteUser(@Param() userId: { id: string }) {
    return this.userService.deleteUser(parseInt(userId.id));
  }

  @ApiQuery({ name: "page" })
  @ApiQuery({ name: "limit" })
  @Get("view")
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard)
  async viewAllUsers(
    @Query()
    query: {
      page: number;
      limit: number;
      userType: "employees" | "patients" | "all";
    },
    @Req() request: Request,
  ) {
    const token = request.headers["authorization"].split(" ")[1];
    return this.userService.getAllUsers(
      token,
      query.page,
      query.limit,
      query.userType,
    );
  }
  @Get("/me")
  @UseGuards(JwtAuthGuard)
  async me(@Req() request: Request) {
    const token = request.headers["authorization"].split(" ")[1];
    return await this.userService.findSelf(token);
  }
  @Get("/:id")
  @UseGuards(JwtAuthGuard)
  async getUser(@Param() userId: { id: string }) {
    return await this.userService.findUserInfoById(parseInt(userId.id));
  }
}
