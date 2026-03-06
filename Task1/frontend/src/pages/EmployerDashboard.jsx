import { useState, useEffect, useContext } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import "./EmployerDashboard.css";
import { useNavigate } from "react-router-dom";

function EmployerDashboard() {
  const { user } = useContext(AuthContext);
  const token = user?.token;
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
  });

  const [jobs, setJobs] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const fetchJobs = async () => {
    const { data } = await API.get("/jobs");
    const myJobs = data.filter(
      (job) => job.postedBy._id === user.user._id
    );
    setJobs(myJobs);
  };
  
  useEffect(() => {
    fetchJobs();
  }, []);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    await API.post("/jobs", form, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    alert("Job Posted Successfully");
    
    fetchJobs();
    navigate('/jobs');
  };

  return (
    <div className="container dashboard" style={{ padding: "40px 0" }}>
      <div className="dashboard-box">
        <h3>Post New Job</h3>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input name="title" placeholder="Job Title" onChange={handleChange} required />
          </div>

          <div className="form-group">
            <input name="company" placeholder="Company" onChange={handleChange} required />
          </div>

          <div className="form-group">
            <input name="location" placeholder="Location" onChange={handleChange} required />
          </div>

          <div className="form-group">
            <input name="salary" placeholder="Salary" onChange={handleChange} />
          </div>

          <div className="form-group">
            <input name="description" placeholder="Description" onChange={handleChange} required />
          </div>

          <button className="form-btn">Post Job</button>
        </form>
      </div>

      <div className="dashboard-box dashboard-jobs">
        <h3>Your Posted Jobs</h3>

        {jobs.length === 0 ? (
          <p>No jobs posted yet.</p>
        ) : (
          jobs.map((job) => (
            <div key={job._id} style={{ marginBottom: "10px" }}>
              {job.title} - {job.location}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default EmployerDashboard;
