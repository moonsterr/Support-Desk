import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Welcome from './pages/welcome';
import Register from './pages/Register';
import Login from './pages/Login';
import CreateTicket from './pages/createTicket';
import TicketLayout from './components/ticketLayout';
import TicketViewLayout from './components/ticketViewLayout';
import ViewTickets from './pages/ViewTickets';
import Ticket from './pages/Ticket';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route to="/" element={<Layout />}>
          <Route index element={<Welcome />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="createticket" element={<TicketLayout />}>
            <Route index element={<CreateTicket />} />
          </Route>
          <Route path="view" element={<TicketViewLayout />}>
            <Route index element={<ViewTickets />} />
            <Route path=":id" element={<Ticket />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
