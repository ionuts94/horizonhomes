import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, Profile, SignIn, SignUp, ForgotPassword, Offers } from "./pages";
import { ToastContainer } from 'react-toastify';
import { Header } from "./components";

import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="offers" element={<Offers />} />
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
        progress={undefined}
        theme="dark"
      />
    </Router>
  );
}

export default App;
