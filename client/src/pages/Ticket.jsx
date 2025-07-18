import { useEffect, useState } from 'react';
import { useOutletContext, useParams, useNavigate } from 'react-router-dom';
import { FaPlus, FaTimes } from 'react-icons/fa';
import useLocalStorage from '../hooks/useLocaleStorage';

export default function Ticket() {
  const [ticket, setTicket] = useState(null);
  const [toggle, setToggle] = useState(false);
  const { tickets } = useOutletContext();
  const [storage] = useLocalStorage('jwt');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (tickets && id) {
      const found = tickets.find((t) => t._id === id);
      setTicket(found);
    }
  }, [tickets, id]);

  async function handleSubmit(formData) {
    const description = formData.get('note');
    const ticketId = ticket._id;

    const res = await fetch('http://localhost:3000/api/tickets/addnote', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${storage}`,
      },
      body: JSON.stringify({ description, ticketId }),
    });

    const data = await res.json();
    if (data.success) {
      setTicket(data.data);
      setToggle(false);
    } else {
      alert('Error adding note');
    }
  }

  async function handleClose() {
    await fetch(`http://localhost:3000/api/tickets/delete/${ticket._id}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${storage}`,
      },
    });
    navigate('../');
    window.location.reload();
  }

  if (!ticket) return <p>Loading ticket...</p>;

  const [year, month, day] = ticket.createdAt.split('T')[0].split('-');
  const [time] = ticket.createdAt.split('T')[1].split('.');

  return (
    <>
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
          {ticket.notes?.map((note) => {
            const [yearr, monthh, dayy] = note.createdAt
              .split('T')[0]
              .split('-');
            const [timee] = note.createdAt.split('T')[1].split('.');
            const username = note.user.username;

            return (
              <div className="comment" key={note._id}>
                <div className="comment-heading">
                  <h4>Note by {username}</h4>
                  <p>
                    {dayy}/{monthh}/{yearr}, at {timee}
                  </p>
                </div>
                <p>{note.description}</p>
              </div>
            );
          })}
          <button onClick={() => setToggle(true)}>
            <FaPlus className="icon" /> Add Note
          </button>
        </div>
        <button className="close-btn" onClick={handleClose}>
          Close ticket
        </button>
      </div>

      {toggle && (
        <div className="note-overlay">
          <div className="add-note">
            <FaTimes className="icon" onClick={() => setToggle(false)} />
            <h1>Add Note</h1>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(new FormData(e.target));
              }}
            >
              <input type="text" name="note" id="note" />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
