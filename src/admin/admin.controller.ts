import {Body, Controller, Delete, Get, Param, Patch, Post, Req, Request, UseGuards} from '@nestjs/common';
import {JwtAuthGuard} from "../guards/jwt-auth.guards";
import {AdminService} from "./admin.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}
  @Post('create-user')
  @UseGuards(JwtAuthGuard)
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.adminService.createUser(createUserDto);
  }
  @Patch('update-user/:userId')
  @UseGuards(JwtAuthGuard)
  async updateUser(@Param() userId: number, @Body() updateUserDto: UpdateUserDto) {
    return this.adminService.updateUser(userId, updateUserDto);
  }
  @Delete('delete-user/:id')
  @UseGuards(JwtAuthGuard)
  async deleteUser(@Param() userId: number) {
    return this.adminService.deleteUser(userId);
  }
  @Get('users')
  @UseGuards(JwtAuthGuard)
  async viewAllUsers(@Req() request: Request) {
    const token = request.headers['authorization'].split(' ')[1];

    return this.adminService.getAllUsers(token);
  }
  @Get('organizations')
  @UseGuards(JwtAuthGuard)
  async viewAllOrganizations(@Req() request: Request) {
    const token = request.headers['authorization'].split(' ')[1];

    return this.adminService.getAllOrgs(token);
  }
}
