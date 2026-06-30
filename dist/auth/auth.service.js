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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const jwt_1 = require("@nestjs/jwt");
const auth_entity_1 = require("./entities/auth.entity");
const hashingservice_service_1 = require("./hashingService/hashingservice.service");
const jwt_config_1 = __importDefault(require("./config/jwt.config"));
let AuthService = class AuthService {
    userRepository;
    hashingService;
    jwtService;
    jwtConfiguration;
    constructor(userRepository, hashingService, jwtService, jwtConfiguration) {
        this.userRepository = userRepository;
        this.hashingService = hashingService;
        this.jwtService = jwtService;
        this.jwtConfiguration = jwtConfiguration;
    }
    async signup(signupDto) {
        try {
            const { email, username, password } = signupDto;
            if (!email || !username || !password) {
                throw new common_1.BadRequestException('Email, username and password are required');
            }
            const existingUser = await this.userRepository.findOne({
                where: [{ email }, { username }],
            });
            if (existingUser) {
                throw new common_1.ConflictException('User with this email or username already exists');
            }
            const hashedPassword = await this.hashingService.hash(password);
            const user = this.userRepository.create({
                email,
                username,
                password: hashedPassword,
            });
            await this.userRepository.save(user);
            return {
                message: 'User created successfully',
                user: {
                    id: user.id,
                    email: user.email,
                    username: user.username,
                },
            };
        }
        catch (error) {
            console.error('Signup Error:', error);
            if (error instanceof common_1.BadRequestException ||
                error instanceof common_1.ConflictException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
    async signin(signinDto) {
        try {
            console.log('========== SIGNIN START ==========');
            console.log('DTO:', signinDto);
            const { email, password } = signinDto;
            if (!email || !password) {
                throw new common_1.BadRequestException('Email and password are required');
            }
            console.log('Step 1: Finding user...');
            const user = await this.userRepository.findOne({
                where: { email },
            });
            console.log('User:', user);
            if (!user) {
                throw new common_1.UnauthorizedException('Invalid email or password');
            }
            console.log('Step 2: Comparing password...');
            const isMatch = await this.hashingService.compare(password, user.password);
            console.log('Password Match:', isMatch);
            if (!isMatch) {
                throw new common_1.UnauthorizedException('Invalid email or password');
            }
            const payload = {
                sub: user.id,
                email: user.email,
            };
            console.log('Step 3: Payload:', payload);
            console.log('JWT Config:', this.jwtConfiguration);
            console.log('JWT_REFRESH_SECRET:', process.env.JWT_REFRESH_SECRET);
            console.log('Step 4: Creating Access Token...');
            const accessToken = await this.jwtService.signAsync(payload, {
                secret: this.jwtConfiguration.secret,
                issuer: this.jwtConfiguration.issuer,
                audience: this.jwtConfiguration.audience,
                expiresIn: '15m',
            });
            console.log('Access Token Created');
            console.log('Step 5: Creating Refresh Token...');
            const refreshToken = await this.jwtService.signAsync(payload, {
                secret: process.env.JWT_REFRESH_SECRET,
                issuer: this.jwtConfiguration.issuer,
                audience: this.jwtConfiguration.audience,
                expiresIn: '3d',
            });
            console.log('Refresh Token Created');
            console.log('========== SIGNIN SUCCESS ==========');
            return {
                accessToken,
                refreshToken,
                user: {
                    id: user.id,
                    email: user.email,
                    username: user.username,
                },
            };
        }
        catch (error) {
            console.error('========== SIGNIN ERROR ==========');
            console.error(error);
            throw error;
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(auth_entity_1.Auth)),
    __param(3, (0, common_1.Inject)(jwt_config_1.default.KEY)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        hashingservice_service_1.Hashingservice,
        jwt_1.JwtService, void 0])
], AuthService);
//# sourceMappingURL=auth.service.js.map