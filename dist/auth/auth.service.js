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
const auth_entity_1 = require("./entities/auth.entity");
const jwt_1 = require("@nestjs/jwt");
const jwt_config_1 = __importDefault(require("./config/jwt.config"));
const hashingservice_service_1 = require("./hashingService/hashingservice.service");
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
        if (!signupDto.email || !signupDto.username || !signupDto.password) {
            throw new common_1.BadRequestException('ایمیل، نام کاربری و رمز عبور الزامی هستند');
        }
        const existingUser = await this.userRepository.findOne({
            where: [
                { email: signupDto.email },
                { username: signupDto.username },
            ],
        });
        if (existingUser) {
            throw new common_1.ConflictException('کاربری با این ایمیل یا نام کاربری وجود دارد');
        }
        const hashedPassword = await this.hashingService.hash(signupDto.password);
        const user = new auth_entity_1.Auth();
        user.email = signupDto.email;
        user.username = signupDto.username;
        user.password = hashedPassword;
        await this.userRepository.save(user);
        return {
            message: 'User created successfully',
            email: user.email,
        };
    }
    async signin(signinDto) {
        if (!signinDto.email || !signinDto.password) {
            throw new common_1.BadRequestException('Email and password are required');
        }
        const user = await this.userRepository.findOneBy({ email: signinDto.email });
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid email or password');
        }
        const isEqual = await this.hashingService.compare(signinDto.password, user.password);
        if (!isEqual) {
            throw new common_1.UnauthorizedException('Invalid email or password');
        }
        const accessToken = await this.jwtService.signAsync({
            sub: user.id,
            email: user.email,
        }, {
            audience: this.jwtConfiguration.audience,
            issuer: this.jwtConfiguration.tokenissuser,
            secret: this.jwtConfiguration.secret,
            expiresIn: this.jwtConfiguration.accesstokenttl,
        });
        const { password, ...userWithoutPassword } = user;
        return { accessToken, user: userWithoutPassword };
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