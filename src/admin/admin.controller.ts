import { Controller, Get, Req, Request, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../guards/jwt-auth.guards";
import { AdminService } from "./admin.service";
import { Roles } from "../decorators/role.decorator";
import { Role } from "../user/enums/roles.enum";

@Controller("helpers")
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get("filials")
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  async viewAllFilials(@Req() request: Request) {
    const token = request.headers["authorization"].split(" ")[1];
    return this.adminService.getAllFilials(token);
  }
}
