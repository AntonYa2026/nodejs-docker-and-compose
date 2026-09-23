import { AuthGuard } from '@nestjs/passport';

export const LocalAuthGuard = AuthGuard('local');
