import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Field from "./Field";
import SubmitButton from "./SubmitButton";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(username, password)) {
      navigate("/admin");
    } else {
      alert("Identifiants incorrects");
    }
  };

  return (
    <form className='row' onSubmit={handleSubmit}>
      <h2>Admin Login</h2>
      <Field value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
      <Field type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <div className="row mb-3">
        <div className="col-sm-10">
            <SubmitButton label="Se connecter" />
        </div>
      </div>
    </form>
  );
}
