import { IsString, IsNotEmpty, IsEnum, IsNumber } from "class-validator";

export class CreateNotificationDto {
    @IsString()
    @IsNotEmpty()
    header: string;
  
    @IsString()
    @IsNotEmpty()
    body: string;
  
    @IsEnum(['INFO', 'WARNING', 'ERROR'], { message: 'Invalid category choice' })
    category: string;
  }