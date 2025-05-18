import { useState, useEffect } from "react";
import Field from "../Field";

export default function QuestionForm({ mode, initialValue = '', onCancel, onSubmit }) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue); 
  }, [initialValue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim()) {
      onSubmit(value);
      setValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <div className="row">
        <Field 
            placeholder="Name of question"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            required={true} />
            <div className="btn-group">
                <button type="submit" className="btn btn-primary me-2">
                    {mode === 'edit' ? 'Update' : 'Add'}
                </button>
                <button type="button" className="btn btn-secondary" onClick={onCancel}>
                    Cancel
                </button>
            </div>
      </div>
    </form>
  );
}
