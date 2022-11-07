export class RegisterModel {
    constructor(
        public firstName: string,
        public lastName: string,
        public userName: string,
        public email: string,
        public password: string,
        public confirmPassword: string
    ){}
}