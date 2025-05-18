import { useState } from "react";
import SubmitButton from "./SubmitButton"
import Field from './Field';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function FeedbackForm() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        comment: "",
    });
    
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
                ...prev, 
                [id]: value 
            })
        );
        setErrors((prev) => ({ 
                ...prev, 
                [id]: "" 
            })
        );
    };
    
    const validateForm = () => {
        const newErrors = {};
       
        if (!formData.comment.trim()) newErrors.comment = "Comment required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if(!validateForm()){
            return;
        }
        try {
          const res = await fetch("http://localhost:8000/api/feedback", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          });
    
          if (!res.ok) throw new Error("Erreur API");
    
          const data = await res.json();
          console.log("Response :", data);
    
          setMessage("Feedback sent successfully !");
          setError(false);
          setFormData({ firstName: "", lastName: "", email: "", comment: "" });
          setErrors({});
        } catch (err) {
          console.error("Error :", err);
          setMessage("An error has occurred.");
          setError(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className='row' onSubmit={handleSubmit}>
            <h1>Feedback</h1>
            {message && (
                <p style={{ color: error ? "red" : "green", fontWeight: "bold" }}>
                {message}
                </p>
            )}
            <Field type="text" id="firstName" placeholder="First name" onChange={handleChange} value={formData.firstName} required={true} />
            <Field type="text" id="lastName" placeholder="Last name" onChange={handleChange} value={formData.lastName} required={true}/>
            <Field type="email" id="email" placeholder="Email" onChange={handleChange} value={formData.email} required={true} />
            <div className="row mb-3">
                <div className="col-sm-10">
                    <textarea id="comment" className="form-control" onChange={handleChange} value={formData.comment} />
                    {errors.comment && (
                        <div className="text-danger mt-1">{errors.comment}</div>
                    )}
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-sm-10">
                    <SubmitButton disabled={loading} />
                </div>
            </div>
        </form>
    )
}