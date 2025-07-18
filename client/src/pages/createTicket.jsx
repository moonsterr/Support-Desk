import { useOutletContext } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function CreateTicket() {
  const { user, storage } = useOutletContext();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  // Sync values when user is loaded
  useEffect(() => {
    if (user) {
      setUsername(user.username || '');
      setEmail(user.email || '');
    }
  }, [user]);

  async function handleSubmit(formData) {
    const username = formData.get('username');
    const email = formData.get('email');
    const product = formData.get('product');
    const description = formData.get('description');
    console.log(username, email, product, description);
    const res = await fetch(
      'https://support-desk-bupd.onrender.com/api/tickets/create',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${storage}`,
        },
        body: JSON.stringify({
          username,
          email,
          product,
          description,
        }),
      }
    );
    const data = await res.json();
    console.log('ticket created', data);
  }
  return (
    <>
      <div className="ticket-header">
        <h1>Create New Ticket</h1>
        <p>Please fill out the form below</p>
      </div>

      <form action={handleSubmit} className="ticket-form">
        <label>Customer Name</label>
        <input
          type="text"
          value={username}
          placeholder="Enter your name"
          name="username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <label>Customer Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Product</label>
        <select name="product">
          <option value="iphone">iPhone</option>
          <option value="android">Android</option>
          <option value="laptop">Laptop</option>
        </select>

        <label>Description of the issue</label>
        <textarea name="description" placeholder="Description"></textarea>

        <button type="submit">Submit</button>
      </form>
    </>
  );
}
