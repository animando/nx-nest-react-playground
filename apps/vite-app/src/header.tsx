import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
} from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import { routes } from './app/routes';

export function Header() {
  return (
    <header>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <SignOutButton />
        <div role="navigation">
          <ul className="flex flex-row">
            {routes.map(({ path, title }) => (
              <li key={path} className="mr-2">
                <Link to={path}>{title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </SignedIn>
    </header>
  );
}

export default Header;
