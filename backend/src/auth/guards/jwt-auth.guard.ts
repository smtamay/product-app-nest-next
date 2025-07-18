// src/auth/guards/jwt-auth.guard.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    handleRequest(err, user, info) {
          console.log('🛑 handleRequest');
  console.log('🔍 err:', err);
  console.log('👤 user:', user);
  console.log('📄 info:', info);
    if (err || !user) {
      throw new UnauthorizedException('Token inválido o ausente');
    }
    return user;
  }
}
