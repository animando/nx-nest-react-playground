import { Module } from '@nestjs/common';
import { ClerkConfigService } from './clerk-config.service';
import { VerifyTokenGuard } from './clerk-auth-guard';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [],
  providers: [ClerkConfigService, VerifyTokenGuard],
  exports: [ClerkConfigService],
})
export class ClerkAuthModule {}
