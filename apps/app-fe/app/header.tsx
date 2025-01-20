import Link from 'next/link';

type Page = {
  name: string;
  route: string;
};
const pages: Page[] = [
  {
    name: 'Inventory',
    route: '/inventory',
  },
  {
    name: 'Counter',
    route: '/counter',
  },
  {
    name: 'Server Actions',
    route: '/server-action',
  },
];

const NavLink = ({ page }: { page: Page }) => (
  <li className="mr-2">
    <Link href={page.route}>{page.name}</Link>
  </li>
);

export const Header = () => {
  return (
    <nav>
      <ul className="flex flex-row" role="list">
        {pages.map((page) => (
          <NavLink key={page.route} page={page} />
        ))}
      </ul>
    </nav>
  );
};
