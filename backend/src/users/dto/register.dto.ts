import { IsNotEmpty, IsString, MinLength, NotContains } from "class-validator";

export class RegisterDto {
    @IsString()
    @IsNotEmpty({message: 'Full name is required'})
    fullName: string;

    @IsString()
    @IsNotEmpty({message: 'Username is required'})
    @NotContains(' ', {message: 'Username cannot contain spaces'})
    username:string;

    @IsString()
    @MinLength(6, {message: 'Password must be at least 6 characters'})
    password:string;

}