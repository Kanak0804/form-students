import { useEffect, useState } from "react";
import axios from "axios";
// import './Students.css';

function TablePage() {
  const [student, setStudent] = useState([]);

  function getStudents() {
    axios.get("http://localhost:8080/api/students")
      .then((res) => {
        setStudent(res.data);
      });
  }

  useEffect(() => {
    getStudents();
  }, []);

  return (
    <div className="table-page">
  <h2 className="text-center">Student List</h2>

  <table className="table table-bordered mt-3 ">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Course</th>
          </tr>
        </thead>

        <tbody>
          {student.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
              <td>{item.course}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TablePage;