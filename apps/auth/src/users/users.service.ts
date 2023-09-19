import {Injectable, UnauthorizedException} from '@nestjs/common';
import {UsersRepository} from "./users.repository";
import {CreateUserDto} from "./dto/create-user.dto";
import * as bcrypt from "bcryptjs"

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) {
    }

    async create(createUserDto: CreateUserDto) {
        return this.usersRepository.create({
            ...createUserDto,
            password: await bcrypt.hash(createUserDto.password, 7)
        })
    }

    async validate(email: string, password: string) {
        const user = await this.usersRepository.findOne({ email });
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Credentials are not valid')
        }

        return user;
    }
}
