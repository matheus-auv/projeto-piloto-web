import { BrowserRouter, Route, Routes } from 'react-router';
import { Home } from '../pages/home';

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};
