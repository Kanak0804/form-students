import { useEffect, useState } from "react";
import axios from "axios";

function UpdatePage() {

  const [students, setStudents] = useState([]);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: ""
  });

  // 🔹 GET students
  function getStudents() {
    axios.get("http://localhost:8080/api/students")
      .then((res) => setStudents(res.data));
  }

  useEffect(() => {
    getStudents();
  }, []);

  // 🔹 EDIT button click
  function handleEdit(item) {
    setFormData({
      name: item.name,
      email: item.email,
      phone: item.phone,
      course: item.course
    });

    setEditId(item.id);
  }

  // 🔹 input change
  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  // 🔹 UPDATE using POST
  function handleUpdate(e) {
    e.preventDefault();

    axios.post("http://localhost:8080/api/update", {
      id: editId,
      ...formData
    })
      .then(() => {
        alert("Updated");
        setEditId(null);
        getStudents(); // refresh
      });
  }

  return (
    <div className="container mt-5">

      <h2>Student List</h2>

      {/* TABLE */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Email</th><th>Phone</th><th>Course</th><th>Action</th>
          </tr>
        </thead>

        <tbody>
          {students.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
              <td>{item.course}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => handleEdit(item)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* UPDATE FORM */}
      {editId && (
        <form onSubmit={handleUpdate} className="mt-4">

          <input className="form-control mb-2" name="name" value={formData.name} onChange={handleChange} />
          <input className="form-control mb-2" name="email" value={formData.email} onChange={handleChange} />
          <input className="form-control mb-2" name="phone" value={formData.phone} onChange={handleChange} />
          <input className="form-control mb-2" name="course" value={formData.course} onChange={handleChange} />

          <button className="btn btn-success">Update</button>
        </form>
      )}

    </div>
  );
}

export default UpdatePage;