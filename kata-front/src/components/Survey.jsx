
import { useState } from "react";
import NoteScale from "./NoteScale";
import SubmitButton from "./SubmitButton";
import QuestionsList from "./QuestionsList";

export default function Survey() {
    const [note, setNote] = useState(null);
    const [responses, setResponses] = useState([]);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [questionsLoaded, setQuestionsLoaded] = useState(false);

    const handleNoteChange = (value) => {
        setNote(value);
    };

    const handleResponseChange = (questionId, value) => {
        setResponses((prev) => {
          const updated = [...prev];
          const existing = updated.find(r => r.question === questionId);
          if (existing) {
            existing.response = value;
          } else {
            updated.push({ question: questionId, response: value });
          }
          return updated;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const payload = {
          note,
          responses
        };
        console.log(payload);

        try {
          const res = await fetch('http://localhost:8000/api/survey', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
    
          const data = await res.json();
          console.log("Response :", data);
          setMessage("Your review has been sent successfully !");
          setError(false);
        } catch (err) {
          console.error("Error:", err);
          setMessage("An error occurred while sending.");
          setError(true);
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <h1>Satisfaction survey</h1>
            {message && (
                <p style={{ color: error ? "red" : "green", marginTop: "1rem" }}>
                    {message}
                </p>
            )}
            <QuestionsList onResponseChange={handleResponseChange} onLoaded={() => setQuestionsLoaded(true)} />
            <NoteScale onSelect={handleNoteChange} />
            <SubmitButton disabled={loading || !questionsLoaded} />
        </form>
    )
}