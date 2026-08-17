import { BrowserRouter, Route, Routes } from 'react-router';
import { Home } from '../pages/home';
import { ResumoView } from '../pages/resumo-view';

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resumos/:id" element={<ResumoView />} />
      </Routes>
    </BrowserRouter>
  );
};
