"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const nestjs_pino_1 = require("nestjs-pino");
const jwt_1 = require("@nestjs/jwt");
const jwt_config_1 = __importDefault(require("./auth/config/jwt.config"));
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            jwt_1.JwtModule.registerAsync(jwt_config_1.default.asProvider()),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (config) => ({
                    type: 'postgres',
                    host: config.get('DB_HOST'),
                    port: Number(config.get('DB_PORT')),
                    username: config.get('DB_USER'),
                    password: config.get('DB_PASS'),
                    database: config.get('DB_NAME'),
                    autoLoadEntities: true,
                    synchronize: true,
                    logging: true,
                    ssl: config.get('DB_SSL') === 'true'
                        ? { rejectUnauthorized: false }
                        : false,
                }),
            }),
            nestjs_pino_1.LoggerModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    pinoHttp: {
                        transport: configService.get('NODE_ENV') === 'production'
                            ? undefined
                            : {
                                target: 'pino-pretty',
                                options: {
                                    singleLine: true,
                                },
                            },
                        level: configService.get('NODE_ENV') === 'production'
                            ? 'info'
                            : 'debug',
                    },
                }),
            }),
            auth_module_1.AuthModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map