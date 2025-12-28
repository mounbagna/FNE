const express = require("express");
const cors = require("cors")
const bodyParser = require("body-parser")
const { Pool } = require("pg");
const bcrypt = require("bcrypt")
const crypto  = require("crypto")
const sendEmail = require("./sendEmail")
const adminEmail = require("./adminEmail")
require('dotenv').config();
const multer = require("multer");


const app = express();
const port = process.env.PORT;
const FRONTEND_URL = process.env.FRONTEND_URL;

// Middleware
app.use(cors());
app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// PostgreSQL pool
const isProduction = process.env.NODE_ENV === "production";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: isProduction ? { rejectUnauthorized: false } : false,
});


// Connect to PostgreSQL
pool.connect((err) => {
  if (err) throw err
  console.log(`The database is connected successfully`);
});

function generateRegNo(){
  const letter = String.fromCharCode(65+Math.floor(Math.random()*26))
  const twoDigits = Math.floor(Math.random()*100).toString().padStart(2,"0")
  const year = new Date().getFullYear()
  const fiveDigits = Math.floor(10000 + Math.random() * 90000)
  return `${letter}${twoDigits}-${year}-${fiveDigits}`
}

const upload = multer({
  storage: multer.memoryStorage(),  // ✅ important!
  limits: { fileSize: 5 * 1024 * 1024 } // optional max size
});

// Start server
app.listen(port, (err) => {
  if (err) throw err;
  console.log(`The server is listening on port ${port}`);
});

//------------------------Endpoints-----------------------

/*
//get all users
app.get("/users",(req,res)=>{
  const sql = "SELECT * FROM fne_users";
  pool.query(sql,(err,result)=>{
    if(err) return res.json(err);
    return res.status(200).json(result.rows);
  })
})

//Get a particular user
app.get("/users/:userId",(req,res)=>{
  const Id = Number(req.params.userId);
  const sql = `SELECT * FROM fne_users WHERE "userId" = $1`;
  pool.query(sql,[Id],(err,result)=>{
    if(err) return res.json(err);
    return res.status(200).json(result.rows[0]);
  })
})

//Add a user

app.post("/users",(req,res)=>{
  const {name,email,password} = req.body;
  const sql = "INSERT INTO fne-users(name,email,password) VALUES($1,$2,$3) RETURNING *";
  pool.query(sql,[name,email,password],(err,result)=>{
    if(err) return res.json(err);
    return res.status(201).json(result.rows[0]);
  })
})
  

//Update a user
app.patch("/users/:userId",(req,res)=>{
  const Id = Number(req.params.userId);
  const {name,email,password} = req.body;
  const sql = `UPDATE fne_users SET name=$1,email=$2,password=$3 WHERE "userId" = $4`;
  pool.query(sql,[name,email,password,Id],(err,result)=>{
    if(err) return res.json(err);
    return res.status(200).send(`The user with ID ${Id} has been updated successfully`);
  })
})

//Delete a user
app.delete("/users/:userId",(req,res)=>{
  const Id = Number(req.params.studentId);
  const sql = `DELETE FROM fne_users WHERE "userId"=$1`;
  pool.query(sql,[Id],(err,result)=>{
    if(err) return res.json(err);
    return res.status(200).send(`The user with ID ${stdId} has been deleted successfully`);
  })
})
*/

// Register a user
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const regNo = generateRegNo();

  try {
    const token = crypto.randomBytes(32).toString("hex");
    const sql = `
      INSERT INTO fne_users(reg_no, name, email, password, verified, token, createdat)
      VALUES($1, $2, $3, $4, $5, $6, NOW())
      RETURNING *;
    `;

    const result = await pool.query(sql, [regNo, name, email, hashedPassword, false, token]);
    const user = result.rows[0];

    const verificationUrl = `${FRONTEND_URL}/users/${user.userId}/verify/${token}`;
    await sendEmail(user.email, "Verification email", `Click to verify: ${verificationUrl}`);

    res.status(201).json({
      message: "Registration successful. Check your email to verify",
      reg_no: user.reg_no,
    });
  } catch (err) {
    console.error(err);
    if (err.code === "23505") { // unique constraint violation
      return res.status(409).json({ message: "Registration number conflict, try again" });
    }
    res.status(500).json({ message: "Registration failed" });
  }
});


//Email Verification
app.get("/users/:userId/verify/:token", async (req, res) => {
  const { userId, token } = req.params;

  try {
    // Check if student exists
    const result = await pool.query(
      `SELECT * FROM fne_users WHERE "userId" = $1`,
      [userId]
    );

    //CASE 1: Student does not exist (deleted after 1 min or never existed)
    if (result.rows.length === 0) {
      return res.status(410).json({
        message: "Verification expired or account already deleted."
      });
    }

    const user = result.rows[0];

    // Check expiration
    const createdat = new Date(user.createdat);
    const now = new Date();
    const diffInMinutes = (now - createdat) / (1000 * 60);

    //CASE 2: Token expired → delete account
    if (diffInMinutes > 1) {
      await pool.query(
        `DELETE FROM fne_users WHERE "userId" = $1`,
        [userId]
      );
      return res.status(410).json({
        message: "Verification expired. Account deleted. Please register again."
      });
    }

    // CASE 3: SUCCESS
    await pool.query(
      `UPDATE fne_users SET verified = true, token = NULL WHERE "userId" = $1`,
      [userId]
    );

    res.json({ message: "Email verified successfully." });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


//Login user
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM fne_users WHERE email = $1";
  const result = await pool.query(sql, [email])

  if(result.rows.length===0) return res.status(400).json({message: "The email does not exist in the database"})

  const user = result.rows[0]
  const isMatch = await bcrypt.compare(password,user.password)
  if(!isMatch) return res.status(400).json({message: "Incorrect Password"})

  delete user.password;
  return res.status(200).json({ message: "Login Successfully", user });
});

//Apply
app.post("/apply",upload.fields([{ name: "cv", maxCount: 1 },{ name: "motivation", maxCount: 1 }]),async (req, res) => {
    try {
      const { reg_no, name, email, phone } = req.body;

      if (!req.files?.cv || !req.files?.motivation) {
        return res.status(400).json({ message: "Files are required" });
      }
      const cvBuffer = req.files.cv[0].buffer;
      const motivationBuffer = req.files.motivation[0].buffer;

      const sql = `INSERT INTO apply (reg_no, name, email, phone, cv, motivation)VALUES ($1, $2, $3, $4, $5, $6)RETURNING reg_no;`;
      await pool.query(sql, [reg_no,name,email,phone,cvBuffer,motivationBuffer]);

      res.status(201).json({
        message: "Application submitted successfully"
      });

    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Your application has failed" });
    }
  }
);

// contact us
app.post("/emailsend", async (req, res) => {
  const { name, email, phone,subject,message } = req.body;

  try {
    const emailContent = 
    await adminEmail(process.env.ADMIN_EMAIL, subject || "Contact Us Email", 
     `Name: ${name}
      Email: ${email}
      Phone: ${phone}
      Message: ${message}
      `);

    res.status(201).json({
      message: "The email has been sent successful.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({message: "Failed to send email"})
  }
});