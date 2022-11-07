import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, userDocument } from "src/schemas/user.schema";
import { RegisterModel } from "./register.model";
import * as bcrypt from 'bcrypt';

const salt = 10;

@Injectable()
export class RegisterService {
    constructor(@InjectModel(User.name) private UserModel: Model<userDocument>) { }
    register: RegisterModel[] = [];

    async registeruser(
        firstName: string,
        lastName: string,
        userName: string,
        email: string,
        password: string,
        confirmPassword: string) {

        const hashPass = await bcrypt.hash(password, salt)

        const newuser = new RegisterModel(firstName, lastName, userName, email, hashPass, confirmPassword)
        this.register.push(newuser)

        const createUser = new this.UserModel(newuser);
            const data = createUser.save();
            return data;
    }
}
