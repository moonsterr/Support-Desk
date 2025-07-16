import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Welcome from './pages/welcome';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route to="/" element={<Layout />}>
          <Route index element={<Welcome />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
