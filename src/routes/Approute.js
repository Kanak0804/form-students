import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FormPage from '../pages/Login';
import TablePage from "../pages/Students";
import UpdatePage from '../pages/Update';



function Approute() {
   return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FormPage />} />
        <Route path="/students" element={<TablePage />} />
        <Route path="/update" element={<UpdatePage />} />
      </Routes>
    </BrowserRouter>
  );
}


export default Approute;