import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/clerk-react';

export const useToken = () => {
  const { getToken } = useAuth();

  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    void getToken().then((t) => setToken(t));
  }, [getToken]);

  return token;
};
