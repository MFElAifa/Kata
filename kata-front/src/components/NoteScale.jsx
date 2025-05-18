import React, { useState } from 'react';
import '../css/NoteScale.css'

const NoteScale = ({ onSelect }) => {
  const [selected, setSelected] = useState(null);

  const handleClick = (value) => {
    setSelected(value);
    onSelect && onSelect(value);
  };

  return (
    <div className="rating-scale">
      <p className="scale-label">Rate your experience (0 = Not at all satisfied, 10 = Very satisfied):</p>
      <div className="scale-options">
        {Array.from({ length: 11 }, (_, i) => (
          <button
            key={i}
            type="button"
            className={`scale-button ${selected === i ? 'selected' : ''}`}
            onClick={() => handleClick(i)}
          >
            {i}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NoteScale;

