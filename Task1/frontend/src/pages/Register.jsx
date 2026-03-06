import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import "./Register.css";
import { toast } from "react-toastify";
function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "candidate",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (loading) return;

  try {
    setLoading(true);

    await API.post("/auth/register", form);

    toast.success("Registration successful! 🎉");

    setTimeout(() => {
      navigate("/login");
    }, 1000);

  } catch (error) {
    toast.error(error.response?.data?.message || "Error occurred ❌");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="container register-page" style={{ padding: "40px 0" }}>
      <div className="register-box">
        <h2>Register</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Role</label>
            <select name="role" onChange={handleChange}>
              <option value="candidate">Candidate</option>
              <option value="employer">Employer</option>
            </select>
          </div>

          <button
            className="form-btn"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
