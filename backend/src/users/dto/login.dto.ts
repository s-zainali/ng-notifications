import { IsNotEmpty, IsString, MinLength, NotContains } from "class-validator"

export class LoginDto {
    @IsString()
    @IsNotEmpty({message: 'Username is required'})
    @NotContains(' ', {message: 'Username cannot conatain spaces'})
    username: string

    @IsString()
    @IsNotEmpty({message: 'Password is required'})
    @MinLength(6, {message: 'Password must be at least 6 characters'})
    password: string
}
