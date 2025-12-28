import React, { useState,useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const JobApplication = () => {
  const navigate = useNavigate()
  const API = import.meta.env.VITE_API_URL;
  const [formData, setFormData] = useState({reg_no: "",name: "",email: "",phone: "",cv: null,motivation: null});
  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.reg_no || !formData.name || !formData.email || !formData.phone || !formData.cv || !formData.motivation) {
    setErrorMsg("All fields are required");
    setTimeout(() => setErrorMsg(""), 3000);
    return;
  }

  try {
    const data = new FormData();
    data.append("reg_no", formData.reg_no);
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("cv", formData.cv);
    data.append("motivation", formData.motivation);

    const res = await axios.post(`${API}/apply`, data);

    setMessage(res.data.message);
    setFormData({ reg_no: "", name: "", email: "", phone: "", cv: null, motivation: null });
    setErrorMsg("");
    setTimeout(() => setMessage(""), 3000);
  } catch (error) {
    setErrorMsg(error.response?.data?.message || "Something went wrong");
  }
};
  
  return (
    
    <div className="container mt-5">
      <div className="shadow p-4 rounded mx-auto" style={{ maxWidth: "600px" }}>
        <h2 className="text-center mb-4">Job Application Form</h2>

        {errorMsg && <p className="err">{errorMsg}</p>}
        {message && (<div className="alert alert-info text-center">{message}</div>)}

        <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
            <label className="form-label">Registration Number</label>
            <input
              type="text"
              className="form-control"
              name="reg_no"
              value={formData.reg_no}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Phone Number</label>
            <input
              type="tel"
              className="form-control"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Upload CV</label>
            <input
              type="file"
              className="form-control"
              name="cv"
              accept=".pdf,.doc,.docx"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Motivation Letter</label>
            <input
              type="file"
              className="form-control"
              name="motivation"
              accept=".pdf,.doc,.docx"
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Submit Application
          </button>
        </form>
        <button onClick={() => navigate("/")} className="login-btn">Logout </button>
      </div>
    </div>
  );
};

export default JobApplication;
