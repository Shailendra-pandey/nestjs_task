import { Controller, Post, Body } from "@nestjs/common";
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
}
