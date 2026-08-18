import { IsString, IsOptional, IsEnum, IsBoolean, IsNumber } from 'class-validator';

export class UpdateNotificationDto {
  @IsString() 
  @IsOptional() 
  header?: string;

  @IsString()
  @IsOptional()
  body?: string;
  
  @IsEnum(['INFO', 'WARNING', 'ERROR'])
  @IsOptional()
  category?: string;
  
  @IsBoolean()
  @IsOptional()
  isClosed?: boolean;
  
  @IsNumber()
  @IsOptional()
  date?: number;
}
