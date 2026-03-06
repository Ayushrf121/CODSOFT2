import { useEffect, useState, useContext } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";

function CandidateDashboard() {
  const { user } = useContext(AuthContext);
  const token = user?.token;

  const [applications, setApplications] = useState([]);

  useEffect(() => {
  const fetchApplications = async () => {
    try {
      const { data } = await API.get("/applications/candidate", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data);
      const myApps = data.filter(
        (app) => app.candidate._id === user.user._id
      );

      setApplications(myApps);
    } catch (error) {
      console.log(error);
    }
  };

  if (token) {
    fetchApplications();
  }
}, [token, user]);

  return (
    <div className="container dashboard" style={{ padding: "40px 0" }}>
      <h3>Your Applications</h3>

      {applications.length === 0 ? (
        <p>No applications yet.</p>
      ) : (
        applications.map((app) => (
          <div key={app._id} style={{ marginBottom: "10px" }}>
            {app.job.title} - {app.status}
          </div>
        ))
      )}
    </div>
  );
}

export default CandidateDashboard;
