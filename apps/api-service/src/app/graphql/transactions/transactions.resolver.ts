import { TransactionsService } from './transactions.service';
import { Resolver, Query, Args } from '@nestjs/graphql';
import { Transaction, TransactionSearch } from '@animando/transaction';
import { PagedRequestMeta, PagedResponse } from '@animando/utils';
import { ClerkAuth, ClerkAuthGraphql } from '@animando/clerk-auth';

const getPagedRequestMeta = ({
  limit,
  nextToken,
}: {
  limit: number | undefined;
  nextToken: string | undefined;
}): PagedRequestMeta | undefined => {
  return limit !== undefined || nextToken !== undefined
    ? {
        limit,
        nextToken,
      }
    : undefined;
};
@Resolver('TransactionsResolver')
export class TransactionsResolver {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Query('transactions')
  @ClerkAuthGraphql()
  async getAllTransactions(
    @Args('limit') limit?: number,
    @Args('nextToken') nextToken?: string
  ): Promise<PagedResponse<Transaction[]>> {
    const rs = await this.transactionsService.getTransactions(
      getPagedRequestMeta({ limit, nextToken })
    );
    return rs;
  }

  @Query('latestTransactions')
  @ClerkAuthGraphql()
  async getlatestTransactions(
    @Args('limit') limit?: number,
    @Args('nextToken') nextToken?: string,
    @Args('search') search?: string
  ): Promise<PagedResponse<Transaction[]>> {
    const rs = await this.transactionsService.getLatestTransactions({
      meta: getPagedRequestMeta({ limit, nextToken }),
      search: search ? (JSON.parse(search) as TransactionSearch) : undefined,
    });
    return rs;
  }
}
