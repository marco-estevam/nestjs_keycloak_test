import { Controller, Get } from '@nestjs/common';
import { AuthenticatedUser, Public, RoleMatchingMode, Roles } from 'nest-keycloak-connect';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Public(false)
  getHello(
    @AuthenticatedUser()
    user: any,
  ): string {
    if (user) {
      return `Hello ${user.preferred_username}`;
    } else {
      return 'Hello world!';
    }
  }

  @Get('private')
  getPrivate() {
    return 'Authenticated only!';
  }

  @Get('user')
  @Roles({ roles: ['user'], mode: RoleMatchingMode.ALL })
  userRole() {
    return 'User only!'
  }

  @Get('admin')
  @Roles({ roles: ['admin'], mode: RoleMatchingMode.ALL })
  adminRole() {
    return 'Admin only!'
  }
}

