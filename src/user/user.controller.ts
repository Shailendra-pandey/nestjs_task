import { Controller, Post, Body } from "@nestjs/common";
import { LoginValidator } from "src/validator/login.validator";
import { RegisterValidator } from "src/validator/register.validator";
import { UserService } from "./user.service";

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Post('register')
    registerUser(
        @Body() registerValidator: RegisterValidator,
    ) {
        return this.userService.registeruser(registerValidator);
    }

    @Post('login')
    loginUser(@Body() loginValidator: LoginValidator) {
        return this.userService.loginuser(loginValidator)
    }
}
