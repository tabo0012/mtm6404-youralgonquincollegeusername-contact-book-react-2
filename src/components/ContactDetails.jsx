import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import db from "../db";

function ContactDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState(null);

  useEffect(() => {
    const fetchContact = async () => {
      const snapshot = await getDoc(doc(db, "contacts", id));
      if (snapshot.exists()) {
        setContact(snapshot.data());
      }
    };
    fetchContact();
  }, [id]);

  const deleteContact = async () => {
    await deleteDoc(doc(db, "contacts", id));
    navigate("/");
  };

  return contact ? (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h1 className="h4 mb-0">
            {contact.firstName} {contact.lastName}
          </h1>
        </div>
        <div className="card-body">
          <p className="card-text">
            <strong>Email:</strong> {contact.email}
          </p>
          <div className="d-flex justify-content-between">
            <Link to={`/edit/${id}`} className="btn btn-outline-primary">
              Edit
            </Link>
            <button onClick={deleteContact} className="btn btn-outline-danger">
              Delete
            </button>
            <Link to="/" className="btn btn-outline-secondary">
              Back to List
            </Link>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="container mt-5 text-center">
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}

export default ContactDetails;
