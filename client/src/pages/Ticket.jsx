import { useOutletContext } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { FaPlus, FaTimes } from 'react-icons/fa';
import { useState } from 'react';

export default function Ticket() {
  const { id } = useParams();
  const { tickets } = useOutletContext();
  const [toggle, setToggle] = useState(false);

  async function handleSubmit(formData) {
    console.log(formData);
  }

  if (!tickets) return <p>Loading ticket...</p>;
  const ticket = (tickets || []).filter((ticket) => ticket._id === id)[0];
  const date = ticket.createdAt.split('T');
  const YMD = date[0];
  const fullTime = date[1];
  const [year, month, day] = YMD.split('-');
  const [time] = fullTime.split('.');
  return (
    <>
      {ticket && (
        <div className="ticket-container">
          <div className="ticket-first-section">
            <div className="ticket-header">
              <h2>Ticket Id: {ticket._id}</h2>
              <h3>
                Date Submitted: {day}/{month}/{year}, at {time}
              </h3>
              <h3>Product: {ticket.product}</h3>
            </div>
            <div className="new">new</div>
          </div>
          <div className="description">
            <h2>Description of Issue</h2>
            <p>{ticket.description}</p>
          </div>
          <div className="notes">
            <h1>Notes</h1>
            <button onClick={() => setToggle(true)}>
              <FaPlus className="icon" /> Add Note
            </button>
          </div>
          <button className="close-btn">Close ticket</button>
        </div>
      )}
      {toggle && (
        <div className="note-overlay">
          <div className="add-note">
            <FaTimes className="icon" />
            <h1>Add Note</h1>
            <form action={handleSubmit}>
              <input type="text" name="note" id="note" />
              <button>Submit</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
