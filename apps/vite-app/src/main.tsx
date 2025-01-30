import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import * as ReactDOM from 'react-dom/client';
import { ClerkProvider } from '@clerk/clerk-react';
import {
  Client,
  Provider as UrqlProvider,
  cacheExchange,
  fetchExchange,
} from 'urql';
import App from './app/app';
import Header from './header';
import { NextUIProvider } from '@nextui-org/react';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const apiServiceUrl = import.meta.env['VITE_API_SERVICE_URL'] || '';

const PUBLISHABLE_KEY = import.meta.env['VITE_CLERK_PUBLISHABLE_KEY'];

if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env.local file');
}
export const createClient = (): Client => {
  const client = new Client({
    url: `${apiServiceUrl}/graphql`,
    exchanges: [cacheExchange, fetchExchange],
    suspense: true,
  });
  return client;
};

root.render(
  <StrictMode>
    <NextUIProvider>
      <BrowserRouter>
        <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
          <UrqlProvider value={createClient()}>
            <Header />
            <App />
          </UrqlProvider>
        </ClerkProvider>
      </BrowserRouter>
    </NextUIProvider>
  </StrictMode>
);
