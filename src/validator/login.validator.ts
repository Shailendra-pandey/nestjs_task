import { IsString, IsEmail, IsNotEmpty } from 'class-validator'


export class LoginValidator {

    @IsString()
    @IsEmail()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string

}
