import { useEffect, useState } from 'react';
import axios from 'axios';
import './Login.css';

function FormPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
  });

  const[student,setStudent]=useState([])

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    axios.post("http://localhost:8080/api/", formData)
      .then((res) => {
        alert("Student Added");

        setFormData({
          name: "",
          email: "",
          phone: "",
          course: ""
        });
      })
      .catch((err) => console.log(err));
  }


  return (
    <>
    <div className="container mt-5">
  <div className="form-box">
    <h2 className="text-center mb-4">Student Form</h2>

        <form onSubmit={handleSubmit}>
          
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter Name"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Email"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input
              className="form-control"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter Phone"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Course</label>
            <select
             className="form-control"
             name="course"
             value={formData.course}
             onChange={handleChange}
            >
           <option value="">Select Course</option>
           <option value="BCA">BCA</option>
           <option value="MCA">MCA</option>
           <option value="B.Tech">B.Tech</option>
           <option value="M.Tech">M.Tech</option>
           <option value="BBA">BBA</option>
           <option value="MBA">MBA</option>
           <option value="BCOM">BCOM</option>
          </select>
          </div>

          <button className="btn btn-primary w-100" type="submit">
            Submit
          </button>

        </form>
      </div>
    </div>
    {/* {student.map((item)=>{
      return (
        <p>{item.name}</p>
      )
    })} */}
    </>
  );
}

export default FormPage;