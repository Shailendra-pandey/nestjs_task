import { Controller, Post, Body } from "@nestjs/common";
import { RegisterValidator } from "src/validator/register.validator";
import { RegisterService } from "./register.service";

@Controller('user')
export class RegisterController {

    constructor(private readonly registerService: RegisterService) { }

    @Post('register')
    async registerUser(
        @Body() registerValidator: RegisterValidator,
        @Body('firstName') firstName: string,
        @Body('lastName') lastName: string,
        @Body('userName') userName: string,
        @Body('email') email: string,
        @Body('password') password: string,
        @Body('confirmPassword') confirmPassword: string
    ): Promise<any> {
        const data = await this.registerService.registeruser(firstName, lastName, userName, email, password, confirmPassword);
        return "User registered successfully"
    }
}
