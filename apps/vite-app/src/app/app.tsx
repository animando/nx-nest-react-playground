import { Route, Routes, Link } from 'react-router-dom';
import { routes } from './routes';
import { MultipleTabsCheck } from '@animando/ui-components';

export function App() {
  return (
    <div>
      <MultipleTabsCheck>
        <p>
          This application will not function reliably if multiple tabs are open.
        </p>
        <p>Close duplicate browser tabs and reload this page to continue</p>
      </MultipleTabsCheck>
      <Routes>
        {routes.map(({ path, component: Component }) => (
          <Route key={path} path={path} Component={Component} />
        ))}
      </Routes>
    </div>
  );
}

export default App;
