import { useEffect, useState } from "react";
import axios from "axios";

function DeletePage() {

  const [students, setStudents] = useState([]);

  // 🔹 get data
  function getStudents() {
    axios.get(`http://localhost:8080/api/students`)
      .then((res) => setStudents(res.data));
  }

  useEffect(() => {
    getStudents();
  }, []);

  // 🔹 delete function
  function handleDelete(id) {
    if (window.confirm("Are you sure?")) {
      axios.delete(`http://localhost:8080/api/students/${id}`)
        .then(() => {
          alert("Deleted Successfully");
          getStudents(); // refresh
        })
        .catch((err) => console.log(err));
    }
  }

  return (
    <div className="container mt-5">

      <h2>Student List</h2>

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
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default DeletePage;