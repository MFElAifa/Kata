import React, { useEffect, useState } from 'react';
import Question from './Question';

const QuestionsList = ({onResponseChange, onLoaded }) => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/questions', {
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
