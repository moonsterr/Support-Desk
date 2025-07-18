import { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { useOutletContext } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { setStorage } = useOutletContext();
  async function handleSubmit(formData) {
    const username = formData.get('username');
    const email = formData.get('email');
    const password = formData.get('password');
    const confirm = formData.get('confirm');
    if (password !== confirm) {
      setError('matching');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('email');
      return;
    }
    try {
      const res = await fetch('http://localhost:3000/api/users/create', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });
      const data = await res.json();
      if (!data.success) {
        setError('unkown');
        return;
      }
      const res2 = await fetch('http://localhost:3000/api/users/login', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const data2 = await res2.json();
      if (!data2.success) {
        setError('unkown');
        return;
      }
      setStorage(data2.data);
      navigate('../');
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <main className="register-main">
      <div className="form-header">
        <h1>
          <FaUser className="icon" /> Register
        </h1>
        <p>Please create an account</p>
      </div>

      <form action={handleSubmit} className="form-body">
        <input
          type="text"
          name="username"
          placeholder="Enter your name"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          required
        />
        <input
          type="password"
          name="confirm"
          placeholder="Confirm password"
          required
        />
        <button type="submit">Submit</button>
        {error === 'matching' && (
          <p className="error-msg">Passwords do not match.</p>
        )}
        {error === 'email' && (
          <p className="error-msg">Please enter a valid email address.</p>
        )}
        {error === 'unknown' && (
          <p className="error-msg">
            An unknown error occurred. Please try again.
          </p>
        )}
      </form>
    </main>
  );
}
