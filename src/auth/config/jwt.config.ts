import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  secret: 'super_secret_key_change_this_please',
  audience: 'localhost:3000',
  issuer: 'localhost:3000',
  accessTokenTtl: 3600,
}));