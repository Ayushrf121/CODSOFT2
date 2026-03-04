import { useState, useContext } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import API from "../api/axios";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({
    email: "",
    password: "",
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

    const { data } = await API.post("/auth/login", form);

    toast.success(`Welcome back, ${data.user.name}! 🎉`);

    login(data);

    setTimeout(() => {
      if (data.user.role === "employer") {
        navigate("/employer");
      } else {
        navigate("/candidate");
      }
    }, 1000);

  } catch (error) {
    toast.error(error.response?.data?.message || "Login failed ❌");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="container login-page" style={{ padding: "40px 0" }}>
      <div className="login-box">
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
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

          <button
            className="form-btn"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;