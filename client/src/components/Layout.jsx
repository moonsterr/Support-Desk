import Header from './header';
import { Outlet } from 'react-router-dom';
import useLocaleStorage from '../hooks/useLocaleStorage';
export default function Layout() {
  const [storage, setStorage] = useLocaleStorage('jwt');
  return (
    <>
      <Header storage={storage} setStorage={setStorage} />
      <Outlet context={{ setStorage, storage }} />
    </>
  );
}
