import React, { useContext, useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebase";
import { signOut } from 'firebase/auth'; 

export default function Dashboard() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { currentUser, dispatch } = useContext(AuthContext);

  function handleLogout() {
    signOut(auth).then(() => {
      dispatch({ type: "LOGOUT", payload: null });
      console.log("signout successfull")
    }).catch((error) => {
      setError(error.message);
    });
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email:</strong> {currentUser.email}
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </>
  );
}
