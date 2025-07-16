import { FaTicketAlt, FaQuestion } from 'react-icons/fa';

export default function Welcome() {
  return (
    <main className="welcome">
      <h1>What do you need help with?</h1>
      <h2>Please choose from an option below</h2>

      <div className="welcome-btns">
        <button className="welcome-btn-create">
          <FaQuestion className="icon" /> Create a new ticket
        </button>
        <button className="welcome-btn-view">
          <FaTicketAlt className="icon" /> View your tickets
        </button>
      </div>
    </main>
  );
}
