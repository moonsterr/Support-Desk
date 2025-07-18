import { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocaleStorage';

export default function TicketLayout() {
  const [storage] = useLocalStorage('jwt');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const server = 'https://support-desk-bupd.onrender.com/api/users';
  useEffect(() => {
    async function getUser() {
      const resUser = await fetch(`${server}/get`, {
        headers: {
          authorization: `Bearer ${storage}`,
        },
      });
      const dataUser = await resUser.json();
      console.log('this is the user', dataUser);
      setUser(dataUser.data);
    }
    getUser();
  }, []);
  if (!storage) {
    navigate('../login');
  }
  return (
    <main className="create-ticket-main">
      <div className="ticket-container">
        <Link className="back-btn" to="/">
          ← Back
        </Link>
        <Outlet context={{ user, storage }} />
      </div>
    </main>
  );
}
