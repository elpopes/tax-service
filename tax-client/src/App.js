import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./components/Dashboards/Dashboard";
import Footer from "./components/Footer";
import EmailConfirmed from "./components/EmailConfirmation/EmailConfirmed";
import EmailConfirmationFailure from "./components/EmailConfirmation/EmailConfirmationFailure";
import ProfilePage from "./components/ProfilePage";
import { Route, Routes } from "react-router-dom";
import { fetchUser } from "./store/users/usersOperations";

function App() {
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.sessions.user.id);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUser(userId));
    }
  }, [dispatch, userId]);

  return (
    <>
      <div className="App">
        <Navbar />
        <Sidebar />
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/email-confirmed" element={<EmailConfirmed />} />
          <Route
            path="/email-confirmation-failure"
            element={<EmailConfirmationFailure />}
          />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
