import React from 'react';
import '../css/SubmitButton.css';

const SubmitButton = ({ label = "Envoyer", disabled = false}) => {
  return (
    <button type="submit" className="submit-button" disabled={disabled} >
      {label}
    </button>
  );
};

export default SubmitButton;