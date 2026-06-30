import { AuthType } from '../enum/auth-type';
export declare const AUTH_TYPE_KEY = "authType";
export declare const Auth: (...authType: AuthType[]) => import("@nestjs/common").CustomDecorator<string>;
