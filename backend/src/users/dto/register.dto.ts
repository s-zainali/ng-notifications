import { IsNotEmpty, IsString, MinLength, NotContains } from "class-validator";

export class RegisterDto {
    @IsString()
    @IsNotEmpty({message: 'Full name is required'})
    fullName: String;

    @IsString()
    @IsNotEmpty({message: 'Username is required'})
    @NotContains(' ', {message: 'Username cannot contain spaces'})
    username:String;

    @IsString()
    @MinLength(6, {message: 'Password must be at least 6 characters'})
    password:String;

}