import { Link } from 'react-router-dom';

export const Home = () => (
  <div>
    <p>Root page</p>
    <p>
      Click <Link to="/transactions">here</Link> to see some transactions
    </p>
  </div>
);
