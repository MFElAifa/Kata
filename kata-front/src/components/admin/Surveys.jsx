import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Surveys = () => {
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
      if (!isAdmin) {
        navigate("/");
      }
    }, [isAdmin, navigate]
  );

  useEffect(() => {
    fetch(`${API_URL}/surveys`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setSurveys(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error API:', err);
        setLoading(false);
      });
  }, []);

  const groupedByNote = surveys.reduce((acc, survey) => {
    const note = survey.note;
    acc[note] = (acc[note] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(groupedByNote)
  .map(([note, count]) => ({ note: Number(note), count }))
  .sort((a, b) => a.note - b.note);

  return (
    <div>
        <hr></hr>
        {loading ? (
          <div className="text-center my-3">Loading...</div>
        ) : (
          surveys.length > 0 ? (
            <table className="table table-striped table-bordered table-hover">
                <thead className="table-dark">
                    <tr>
                        <th>Note</th>
                        <th>Question/Response</th>
                    </tr>
                </thead>
                <tbody>
                    {surveys.map((survey) => (
                        <tr key={survey.id} id={survey.id}>
                          <td>{survey.note}</td>
                          <td>
                          {survey.customResponses.length > 0 ? (
                            survey.customResponses.map((r, i) => (
                              <div key={i}><strong>{r.question}</strong>: {r.response}</div>
                            ))
                          ) : (
                            <em className="text-muted">No response</em>
                          )}
                          </td>
                        </tr>
                    ))}
                    <tr>
                      <td colSpan={2}>
                      <h4 className="my-4">Distribution of grades</h4>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chartData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="note" label={{ value: 'Note', position: 'insideBottom', dy: 10 }} />
                          <YAxis allowDecimals={false} />
                          <Tooltip />
                          <Bar dataKey="count" fill="#007bff" />
                        </BarChart>
                      </ResponsiveContainer>
                      </td>
                    </tr>    
                </tbody>
            </table>
          ) : (
            <em className="text-muted">No survey</em>
          )
        )}
    </div>
  );
};

export default Surveys;
