import { useOutletContext } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function ViewTickets() {
  const { tickets } = useOutletContext();
  const ticketElements = (tickets || []).map((ticket) => {
    const date = ticket.createdAt.split('T');
    const YMD = date[0];
    const fullTime = date[1];
    const [year, month, day] = YMD.split('-');
    const [time] = fullTime.split('.');
    return (
      <div className="tickets-view-box ticket" key={ticket._id}>
        <div className="first-section">
          <p>
            {day}/{month}/{year}, at {time}
          </p>
          <p>{ticket.product}</p>
        </div>
        <div className="second-section">
          <div className="new">new</div>
          <Link to={`${ticket._id}`}>View</Link>
        </div>
      </div>
    );
  });
  return (
    <div className="tickets-view">
      <h1>Tickets</h1>
      <div className="tickets-view-box">
        <h3>Date</h3>
        <h3>Product</h3>
        <h3>Status</h3>
      </div>
      {ticketElements}
    </div>
  );
}
