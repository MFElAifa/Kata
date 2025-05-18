import React, { useEffect, useState } from 'react';
import QuestionForm from './QuestionForm';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Questions = () => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formMode, setFormMode] = useState(null);
    const [formValue, setFormValue] = useState('');
    const [editId, setEditId] = useState(null);
    const { isAdmin } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAdmin) {
          navigate("/");
        }
      }, [isAdmin, navigate]
    );

    const fetchQuestions = () => {
        setLoading(true);
        fetch('http://localhost:8000/api/questions', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            setQuestions(data);
            setLoading(false);
        })
        .catch((err) => {
            console.error('Erreur API:', err);
            setLoading(false);
        });
    };
    useEffect(() => {
        fetchQuestions();
    }, []);

    const handleDelete = (id) => {
        if (!window.confirm("Delete this question ?")) return;
      
        fetch(`http://localhost:8000/api/question/${id}`, {
          method: 'DELETE',
        }).then(() => fetchQuestions());
    };

  return (
    <div>
        <hr></hr>
        {formMode && (
            <QuestionForm
                mode={formMode}
                initialValue={formValue}
                onCancel={() => {
                    setFormMode(null);
                    setFormValue('');
                    setEditId(null);
                }}
                onSubmit={(value) => {
                    const method = formMode === 'edit' ? 'PUT' : 'POST';
                    const url = formMode === 'edit' ? `http://localhost:8000/api/question/${editId}` : `http://localhost:8000/api/question`;

                    fetch(url, {
                        method,
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ name: value }),
                    }).then(() => {
                        setFormMode(null);
                        setFormValue('');
                        setEditId(null);
                        fetchQuestions(); 
                    });
                }}
            />
        )}
        {loading ? (
          <div className="text-center my-3">Loading...</div>
        ) : (
            <div>
                <div className="mb-3 text-end">
                    <button className="btn btn-success" onClick={() => {
                            setFormMode('add');
                            setFormValue('');
                            setEditId(null);
                        }}>Add a question</button>
                </div>
                {questions.length > 0 ? (
                    <table className="table table-striped table-bordered table-hover">
                        <thead className="table-dark">
                            <tr>
                                <th>Question</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {questions.map((question) => (
                                <tr key={question.id} id={question.id}>
                                    <td>{question.name}</td>
                                    <td>
                                        <button className="btn btn-sm btn-warning me-2"  onClick={() => {
                                                setFormMode('edit');
                                                setFormValue(question.name);
                                                setEditId(question.id);
                                            }}>Edit</button>
                                        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(question.id)}>Remove</button>
                                    </td>
                                </tr>
                            ))}    
                        </tbody>
                    </table>
                ) : (
                    <em className="text-muted">No questions</em>
                )}
            </div>
        )}
    </div>
  );
};

export default Questions;
