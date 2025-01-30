import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Handler, useWebsocket } from './useWebsocket';

import {
  LatestTransactionsQuery,
  LatestTransactionsDocument,
} from './generated/transactions';
import { useQuery } from 'urql';
import { type UITransaction } from '@animando/ui-components';
import { useToken } from '../../lib/useToken';

type AddTransactions = (...t: UITransaction[]) => void;

type LoadMore = () => void;

const useTransactionsQuery = (
  addTransactions: AddTransactions
): { loadMore: LoadMore; hasMore: boolean; isLoading: boolean } => {
  const initialLoadDone = useRef<boolean>(false);
  const token = useToken();
  const [nextToken, setNextToken] = useState<string | null>(null);
  const [nextTokenToUse, setNextTokenToUse] = useState<string | null>(null);
  const [{ data, fetching }, revalidate] = useQuery<LatestTransactionsQuery>({
    query: LatestTransactionsDocument,
    requestPolicy: 'cache-and-network',
    pause: true,
    variables: {
      limit: 200,
      nextToken: nextTokenToUse,
    },
  });
  useEffect(() => {
    if (data?.latestTransactions) {
      addTransactions(...data.latestTransactions.data);
      setNextToken(data.latestTransactions.meta.nextToken || null);
    }
  }, [data, addTransactions]);

  useEffect(() => {
    if (token && !initialLoadDone.current) {
      revalidate({
        fetchOptions: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });
      initialLoadDone.current = true;
    }
  }, [revalidate, token]);

  const loadMore = useCallback<LoadMore>(() => {
    setNextTokenToUse(nextToken);
    initialLoadDone.current = false;
  }, [nextToken]);
  return { loadMore, hasMore: nextToken !== null, isLoading: fetching };
};

const useTransactionsStore = (): [UITransaction[], AddTransactions] => {
  const [transactions, setTransactions] = useState<UITransaction[]>([]);

  const addTransactions = useCallback<AddTransactions>(
    (...transactions: UITransaction[]) => {
      setTransactions((t) => t.concat(transactions));
    },
    []
  );
  return [transactions, addTransactions];
};

const useTransactionsWebsocketConfig = (addTransactions: AddTransactions) => {
  const onNewTransaction = useCallback(
    (trx: UITransaction) => {
      console.log({ trx });
      addTransactions(trx);
    },
    [addTransactions]
  ) as Handler;
  const config = useMemo(
    () => ({
      rooms: ['transactions'],
      handlers: {
        newTransaction: onNewTransaction,
      },
    }),
    [onNewTransaction]
  );
  const { connected } = useWebsocket(config);

  return { connected };
};

export const useTransactionsData = () => {
  const [transactions, addTransactions] = useTransactionsStore();
  const { connected } = useTransactionsWebsocketConfig(addTransactions);
  const { loadMore, hasMore, isLoading } =
    useTransactionsQuery(addTransactions);
  return { connected, transactions, loadMore, hasMore, isLoading };
};
