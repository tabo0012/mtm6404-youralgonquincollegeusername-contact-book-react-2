import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import db from "../db";

function EditContact() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContact = async () => {
      const contactDoc = await getDoc(doc(db, "contacts", id));
      if (contactDoc.exists()) {
        setContact(contactDoc.data());
      } else {
        console.error("Contact not found");
      }
      setLoading(false);
    };
    fetchContact();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, "contacts", id), contact);
      navigate(`/contact/${id}`);
    } catch (error) {
      console.error("Error updating contact: ", error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Edit Contact</h1>
      {loading ? (
        <p className="text-center">Loading contact...</p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="border p-4 rounded-lg shadow-sm"
        >
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label fw-semibold">
              First Name:
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={contact.firstName}
              onChange={handleInputChange}
              className="form-control form-control-lg rounded-pill shadow-sm"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lastName" className="form-label fw-semibold">
              Last Name:
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={contact.lastName}
              onChange={handleInputChange}
              className="form-control form-control-lg rounded-pill shadow-sm"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={contact.email}
              onChange={handleInputChange}
              className="form-control form-control-lg rounded-pill shadow-sm"
              required
            />
          </div>
          <div className="d-flex justify-content-between mt-4">
            <button type="submit" className="btn btn-primary px-4 py-2 fs-5">
              Update Contact
            </button>
            <button
              type="button"
              onClick={() => navigate(`/contact/${id}`)}
              className="btn btn-secondary px-4 py-2 fs-5"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default EditContact;
