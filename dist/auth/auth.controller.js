"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const signin_dto_1 = require("./dto/signin.dto");
const SiginnupDto_1 = require("./dto/SiginnupDto");
const auth_type_1 = require("./enum/auth-type");
const auth_decortor_1 = require("./decorator/auth.decortor");
let AuthController = class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    async signup(signupDto) {
        return this.authService.signup(signupDto);
    }
    async signin(response, signinDto) {
        try {
            console.log('========== CONTROLLER ==========');
            console.log('Request Body:', signinDto);
            console.log('Step 1: Calling AuthService.signin()');
            const result = await this.authService.signin(signinDto);
            console.log('Step 2: Service Success');
            console.log(result);
            console.log('Step 3: Setting Access Token Cookie');
            response.cookie('accessToken', result.accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 15 * 60 * 1000,
            });
            console.log('Access Cookie OK');
            console.log('Step 4: Setting Refresh Token Cookie');
            response.cookie('refreshToken', result.refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 3 * 24 * 60 * 60 * 1000,
            });
            console.log('Refresh Cookie OK');
            console.log('========== END ==========');
            return {
                accessToken: result.accessToken,
            };
        }
        catch (error) {
            console.error('========== CONTROLLER ERROR ==========');
            console.error(error);
            throw error;
        }
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('signup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [SiginnupDto_1.SiginnupDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signup", null);
__decorate([
    (0, common_1.Post)('signin'),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, signin_dto_1.SiginninDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signin", null);
exports.AuthController = AuthController = __decorate([
    (0, auth_decortor_1.Auth)(auth_type_1.AuthType.None),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map