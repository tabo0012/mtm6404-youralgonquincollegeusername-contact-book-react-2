import React from "react";
import { Routes, Route } from "react-router-dom";
import ContactsList from "./components/ContactsList";
import ContactDetails from "./components/ContactDetails";
import NewContact from "./components/NewContact";
import EditContact from "./components/EditContact.jsx";

function App() {
  return (
    <div className="container mt-5">
      <Routes>
        <Route path="/" element={<ContactsList />} />
        <Route path="/contact/:id" element={<ContactDetails />} />
        <Route path="/new" element={<NewContact />} />
        <Route path="/edit/:id" element={<EditContact />} />
      </Routes>
    </div>
  );
}

export default App;
