import { useState } from 'react';
import { BiLogOut } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';

export default function Login() {
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { setStorage } = useOutletContext();

  async function handleSubmit(formData) {
    formData.preventDefault(); // prevent default form submission

    const email = formData.target.email.value;
    const password = formData.target.password.value;

    // Basic validations:
    if (!email || !password) {
      setError('missing');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('email');
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/api/users/login', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!data.success) {
        setError('unknown');
        return;
      }
      console.log(data.data);
      setStorage(data.data); // store the token or relevant data
      navigate('../'); // redirect after login success
    } catch (err) {
      console.log(err);
      setError('unknown');
    }
  }

  return (
    <main className="login-main">
      <div className="form-header">
        <h1>
          <BiLogOut className="icon" /> Login
        </h1>
        <p>Please log in to get support</p>
      </div>

      <form onSubmit={handleSubmit} className="form-body" noValidate>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          required
          autoComplete="username"
        />
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          required
          autoComplete="current-password"
        />
        <button type="submit">Submit</button>

        {error === 'missing' && (
          <p className="error-msg">Please fill in all fields.</p>
        )}
        {error === 'email' && (
          <p className="error-msg">Please enter a valid email address.</p>
        )}
        {error === 'unknown' && (
          <p className="error-msg">Login failed. Please try again.</p>
        )}
      </form>
    </main>
  );
}
