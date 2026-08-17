import { Injectable } from "@nestjs/common";
import { RegisterDto } from "./dto/register.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "./user.schema";
import { JwtService } from "@nestjs/jwt";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private jwtService: JwtService
    ){}

    async register(registerDto: RegisterDto): Promise<{message: string}> {
        const {fullName, username, password} = registerDto;

        return ;
    }

    async login(loginDto: LoginDto) : Promise<{message:string}> {
        const {username, password} = loginDto;

        return;
    }
}