export default function Question({id, text, onChange }) {
    const handleResponseChange = (e) => {
        if (onChange) {
          onChange(id, e.target.value);
        }
    };

    return (
        <div className="question">
            <h3 htmlFor={`q-${id}`}>{text}</h3>
            <textarea
                id={`q-${id}`}
                name={`q-${id}`}
                onChange={handleResponseChange}
                rows="4" 
                cols="50"
            ></textarea>
        </div>
    )
}