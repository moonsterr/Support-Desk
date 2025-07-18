import { BiLogOut } from 'react-icons/bi';
import { FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function Header({ storage, setStorage }) {
  const navigate = useNavigate();
  return (
    <header>
      <p onClick={() => navigate('/')}>Support Desk</p>
      {!storage && (
        <div className="header-btns">
          <button className="btn" onClick={() => navigate('login')}>
            <BiLogOut className="icon" /> Login
          </button>
          <button className="btn" onClick={() => navigate('register')}>
            <FaUser className="icon" /> Register
          </button>
        </div>
      )}
      {storage && (
        <div className="logout-btn">
          <button onClick={() => setStorage('')}>
            <BiLogOut className="icon" />
            Logout
          </button>
        </div>
      )}
    </header>
  );
}
