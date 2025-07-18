import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocaleStorage';

export default function TicketViewLayout() {
  const [storage] = useLocalStorage('jwt');
  const [tickets, setTickets] = useState(null);
  useEffect(() => {
    async function getTickets() {
      const res = await fetch('http://localhost:3000/api/tickets/get', {
        headers: {
          authorization: `Bearer ${storage}`,
        },
      });
      const data = await res.json();
      console.log(data);
      setTickets(data.data);
    }
    getTickets();
  }, []);
  return (
    <main className="view-main">
      <Link className="back-btn" to="/">
        ← Back
      </Link>
      <Outlet context={{ tickets }} />
    </main>
  );
}
