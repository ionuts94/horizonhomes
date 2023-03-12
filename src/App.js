import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, Profile, SignIn, SignUp, ForgotPassword, Offers, CreateListing, EditListing, ListingDetail, Rents, Sales } from "./pages";
import { Header, PrivateRoute, OwnerRoute } from "./components";
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <Router>
      <Header />
      <Routes>

        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="offers" element={<Offers />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/category/:type/:listingId" element={<ListingDetail />} />
        <Route path="/for-rent" element={<Rents />} />
        <Route path="/for-sale" element={<Sales />} />

        {/* Protected routes */}
        <Route path="/profile" element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route path="/create-listing" element={<PrivateRoute />}>
          <Route path="/create-listing" element={<CreateListing />} />
        </Route>

        <Route path="/edit-listing/:listingId" element={<OwnerRoute />}>
          <Route path="/edit-listing/:listingId" element={<EditListing />} />
        </Route>

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
