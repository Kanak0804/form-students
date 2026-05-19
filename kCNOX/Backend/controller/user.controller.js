const { json } = require("express");
const mysql = require("../utils/db");

// 🔹 ADD STUDENT
async function addStudent(req, res) {
  const { name, email, phone, course } = req.body;

  if (!name || !email || !phone || !course) {
    return res.status(400).json({
      message: "All fields are required"
    });
  }

  if (name.length < 4) {
    return res.status(400).json({
      message: "Name must be at least 4 characters"
    });
  }

  if (!email.includes("@")) {
    return res.status(400).json({
      message: "Invalid email"
    });
  }

  if (phone.length !== 10) {
    return res.status(400).json({
      message: "Phone must be 10 digits"
    });
  }

  let sqlcheck = `SELECT * FROM students WHERE email=? AND phone=?`;

  mysql.query(sqlcheck, [email, phone], (err, result) => {
    if (err) return res.status(500).json({ message: "Error checking student" });

    if (result.length > 0) {
      return res.status(400).json({
        message: "Student already exists"
      });
    }

    // ✅ INSERT yahin hona chahiye
    const sql = `INSERT INTO students (name, email, phone, course) VALUES (?, ?, ?, ?)`;

    mysql.query(sql, [name, email, phone, course], (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Database error" });
      }

      res.status(200).json({
        message: "Student Added"
      });
    });
  });
}

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//  GET STUDENT
async function getstudent(req, res) {
  mysql.query("SELECT * FROM students", (err, result) => {
    if (err) return res.status(500).json({ message: "Error fetching data" });
    res.json(result);
  });
}

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//  UPDATE STUDENT 
async function editstudent(req, res) {
  const { name, email, phone, course } = req.body;
  const id = req.params.id;

  //  validation
  if (!name || !email || !phone || !course) {
    return res.status(400).json({
      message: "All fields are required"
    });
  }

  //  check student exists
  const checkSql = `SELECT * FROM students WHERE id=?`;

  mysql.query(checkSql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error checking student" });
    }

    if (result.length === 0) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

   
    const sql = ` UPDATE students SET name=?, email=?, phone=?, course=? WHERE id=?`;

    mysql.query(sql, [name, email, phone, course, id], (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Error updating student",
          error: err
        });
      }

      res.status(200).json({
        message: "Student updated"
      });
    });
  });
}

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// DELETE STUDENT

async function deleteStudent(req, res) {
  const id = req.params.id;

  const sql = "DELETE FROM students WHERE id=?";

  mysql.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Error deleting student",
        error: err
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    res.status(200).json({
      message: "Student deleted successfully"
    });
  });
}

module.exports = {
  addStudent,
  getstudent,
  editstudent,
  deleteStudent
};