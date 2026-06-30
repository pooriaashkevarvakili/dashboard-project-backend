"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = exports.AUTH_TYPE_KEY = void 0;
const common_1 = require("@nestjs/common");
const auth_type_1 = require("../enum/auth-type");
exports.AUTH_TYPE_KEY = 'authType';
const Auth = (...authType) => {
    return (0, common_1.SetMetadata)(exports.AUTH_TYPE_KEY, auth_type_1.AuthType);
};
exports.Auth = Auth;
//# sourceMappingURL=auth.decortor.js.map