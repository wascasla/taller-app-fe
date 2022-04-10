import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import SignIn from "./screens/login/SignIn";
import Dashboard from "./screens/dashboard/Dashboard";
import "react-toastify/dist/ReactToastify.min.css";
import { ClientList } from "./features/clients/clientList";
import { CarList } from "./features/cars/carList";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          
          <Route path="/" element={<Dashboard />}>
            <Route path="clients" element={<ClientList />} />
            <Route path="cars/:idClient" element={<CarList />} />
          </Route> 
        </Routes>
      </BrowserRouter>
      <ToastContainer theme="colored" hideProgressBar />
    </>
  );
}

export default App;
