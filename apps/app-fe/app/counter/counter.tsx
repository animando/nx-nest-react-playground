'use client';

import { Button } from '@nextui-org/react';
import { useStore } from '../../src/store/store';

export const Counter = () => {
  const state = useStore();

  return (
    <div>
      <p>{state.counter}</p>
      <Button onPress={() => state.increase(1)}>Increment</Button>
    </div>
  );
};
