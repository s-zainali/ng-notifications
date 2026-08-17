import { Body, Controller, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('register')
    async register(@Body() registerDto: RegisterDto) {
        this.usersService.register(registerDto)
    }

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        this.usersService.login(loginDto)
    }
}