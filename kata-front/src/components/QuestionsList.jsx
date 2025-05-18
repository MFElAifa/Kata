import React, { useEffect, useState } from 'react';
import Question from './Question';

const QuestionsList = ({onResponseChange, onLoaded }) => {
  const [questions, setQuestions] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/questions`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setQuestions(data);
        onLoaded && onLoaded();
      })
      .catch((err) => console.error('Erreur API:', err));
  }, []);

  const handleChange = (questionId, value) => {
    if (onResponseChange) {
      onResponseChange(questionId, value);
    }
  };

  return (
    <div>
        {questions.map((question) => (
          <Question key={question.id} id={question.id} text={question.name} onChange={handleChange} />
        ))}
    </div>
  );
};

export default QuestionsList;
