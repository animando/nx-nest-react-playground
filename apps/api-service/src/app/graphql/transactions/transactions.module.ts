import { Module } from '@nestjs/common';
import { TransactionsResolver } from './transactions.resolver';
import { TransactionsService } from './transactions.service';
import { RabbitModule } from '@animando/rabbit';
import { ClerkAuthModule } from '@animando/clerk-auth';

@Module({
  imports: [RabbitModule, ClerkAuthModule],
  providers: [TransactionsService, TransactionsResolver],
})
export class TransactionsModule {}
