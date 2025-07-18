import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // This option tells Passport to extract the JWT from the Authorization header
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'secret_key',
    });
  }

  // Method that validates the JWT payload
  validate(payload: { sub: number; email: string }) {
     console.log('🔥 validate() ejecutado con:', payload);
    return { id: payload.sub, email: payload.email };
  }
}
