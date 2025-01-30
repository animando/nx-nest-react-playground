import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ClerkConfigService {
  constructor(private configService: ConfigService) {}

  secretKey() {
    return this.configService.getOrThrow('CLERK_SECRET_KEY');
  }

  jwtKey() {
    return this.configService.getOrThrow('CLERK_JWT_KEY');
  }
}
