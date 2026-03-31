import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @MinLength(6)
    password: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    bio?: string;

    @IsString()
    @IsOptional()
    image?: string;
}