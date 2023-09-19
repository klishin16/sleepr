import {Controller, Post, Res, UseGuards} from '@nestjs/common';
import {AuthService} from './auth.service';
import {LocalAuthGuard} from "./guards/local-auth.guard";
import {CurrentUser} from "./current-user.decorator";
import {UserDocument} from "./users/models/users.schema";
import { Response } from "express-serve-static-core"

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(
        @CurrentUser() user: UserDocument,
        @Res() res: Response
    ) {
        await this.authService.login(user, res);
        res.send(user);
    }
}