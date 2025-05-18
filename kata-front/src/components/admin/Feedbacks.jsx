import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Feedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
      if (!isAdmin) {
        navigate("/");
      }
    }, [isAdmin, navigate]
  );
  const API_URL = import.meta.env.VITE_API_URL;
  useEffect(() => {
    fetch(`${API_URL}/feedbacks`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setFeedbacks(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error API:', err);
        setLoading(false);
      });
  }, []);


  return (
    <div>
        <hr></hr>
        {loading ? (
          <div className="text-center my-3">Loading...</div>
        ) : (
          feedbacks.length > 0 ? (
            <table className="table table-striped table-bordered table-hover">
                <thead className="table-dark">
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Comment</th>
                    </tr>
                </thead>
                <tbody>
                    {feedbacks.map((feedback) => (
                        <tr key={feedback.id} id={feedback.id}>
                          <td>{feedback.firstname}</td>
                          <td>{feedback.lastname}</td>
                          <td>{feedback.email}</td>
                          <td>{feedback.comment}</td>
                        </tr>
                    ))}    
                </tbody>
            </table>
          ) : (
            <em className="text-muted">No feedback</em>
          )
        )}
    </div>
  );
};

export default Feedbacks;
