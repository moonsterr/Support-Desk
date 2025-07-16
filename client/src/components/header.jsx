import useLocalStorage from '../hooks/useLocaleStorage';
import { BiLogOut } from 'react-icons/bi';
import { FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function Welcome() {
  const [storage, setStorage] = useLocalStorage('jwt', '');
  console.log(storage);
  const navigate = useNavigate();
  return (
    <header>
      <p>Support Desk</p>
      {!storage && (
        <div className="header-btns">
          <button className="btn" onClick={() => navigate('login')}>
            <BiLogOut className="icon" /> Login
          </button>
          <button className="btn" onClick={() => navigate('create')}>
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
