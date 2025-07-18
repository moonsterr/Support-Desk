import { FaTicketAlt, FaQuestion } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function Welcome() {
  const navigate = useNavigate();
  return (
    <main className="welcome">
      <h1>What do you need help with?</h1>
      <h2>Please choose from an option below</h2>

      <div className="welcome-btns">
        <button
          className="welcome-btn-create"
          onClick={() => navigate('/createticket')}
        >
          <FaQuestion className="icon" /> Create a new ticket
        </button>
        <button className="welcome-btn-view" onClick={() => navigate('/view')}>
          <FaTicketAlt className="icon" /> View your tickets
        </button>
      </div>
    </main>
  );
}
