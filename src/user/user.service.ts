import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, userDocument } from "src/schemas/user.schema";
import { RegisterModel } from "./user.model";
import * as bcrypt from 'bcrypt';
import { RegisterValidator } from "src/validator/register.validator";
import { LoginValidator } from "src/validator/login.validator";

const salt = 10;

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private UserModel: Model<userDocument>) { }
    register: RegisterModel[] = [];

    async registeruser(registerValidator: RegisterValidator) {

        const hashPass = await bcrypt.hash(registerValidator.password, salt)

        const newuser = new RegisterModel(
            registerValidator.firstName, 
            registerValidator.lastName, 
            registerValidator.userName, 
            registerValidator.email, 
            hashPass
            )
        this.register.push(newuser)

        const createUser = new this.UserModel(newuser);
        return await createUser.save();
    }


    async loginuser(loginValidator: LoginValidator){
        const user = await this.UserModel.findOne({email: loginValidator.email})

        if(!user){
            return 'Incorrect Credentials'
        }

        const passMatch = await bcrypt.compare(loginValidator.password, user.password)

        if(!passMatch){
            return 'Incorrect Credentials'
        }

        return {access_token:user._id};

    }
}
