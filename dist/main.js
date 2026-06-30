"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const nestjs_pino_1 = require("nestjs-pino");
const helmet_1 = __importDefault(require("helmet"));
async function bootstrap() {
    try {
        console.log('1. Bootstrap started');
        const app = await core_1.NestFactory.create(app_module_1.AppModule);
        console.log('2. Nest application created');
        app.use((0, helmet_1.default)());
        app.useGlobalPipes(new common_1.ValidationPipe({
            whitelist: true,
            transform: true,
        }));
        app.useLogger(app.get(nestjs_pino_1.Logger));
        app.enableCors({
            origin: ['http://localhost:5173'],
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
            credentials: true,
        });
        const config = new swagger_1.DocumentBuilder()
            .setTitle('My API')
            .setDescription('Swagger API docs')
            .setVersion('1.0')
            .addBearerAuth()
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, config);
        console.log('========== ROUTES ==========');
        console.log(Object.keys(document.paths));
        console.log('============================');
        swagger_1.SwaggerModule.setup('doshboard-api-swagger', app, document, {
            explorer: true,
            swaggerOptions: {
                persistAuthorization: true,
            },
        });
        const port = Number(process.env.PORT) || 8000;
        console.log(`3. Listening on port ${port}`);
        await app.listen(port, '0.0.0.0');
        console.log(`✅ Server started on port ${port}`);
    }
    catch (error) {
        console.error('❌ Bootstrap Error');
        console.error(error);
    }
}
bootstrap();
//# sourceMappingURL=main.js.map