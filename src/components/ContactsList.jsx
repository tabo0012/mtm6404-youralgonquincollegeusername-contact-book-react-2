import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import db from "../db";

function ContactsList() {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchContacts = async () => {
      const snapshot = await getDocs(collection(db, "contacts"));
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setContacts(data.sort((a, b) => a.lastName.localeCompare(b.lastName)));
    };
    fetchContacts();
  }, []);

  const filteredContacts = contacts.filter((contact) =>
    `${contact.firstName} ${contact.lastName}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <div className="card shadow-lg">
        <div className="card-header bg-primary text-white">
          <h1 className="h4 mb-0">Contact List</h1>
        </div>
        <div className="card-body">
          <div className="mb-4">
            <input
              type="text"
              className="form-control form-control-lg rounded-pill shadow-sm"
              placeholder="Search contacts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <ul className="list-group">
            {filteredContacts.map((contact) => (
              <li
                key={contact.id}
                className="list-group-item d-flex justify-content-between align-items-center border-0 shadow-sm mb-2 rounded-lg"
              >
                <Link
                  to={`/contact/${contact.id}`}
                  className="text-decoration-none text-dark fs-5"
                >
                  {contact.firstName} {contact.lastName}
                </Link>
                <Link
                  to={`/contact/${contact.id}`}
                  className="btn btn-outline-primary btn-sm ms-3"
                >
                  View
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <Link to="/new" className="btn btn-primary w-100 py-2 fs-5">
              Add New Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactsList;
