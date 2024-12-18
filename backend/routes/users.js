const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

const JWT_SECRET = process.env.JWT_SECRET;

// 註冊 POST
router.post("/register", async (req, res) => {
  const { email, name, password } = req.body;

  if (!email || !name || !password) {
    return res.status(400).json({ status: "error", message: "請提供完整的註冊資訊" });
  }

  const queryCheck = "SELECT * FROM user WHERE Email = ?";
  db.query(queryCheck, [email], async (err, results) => {
    if (err) {
      console.error("資料庫錯誤:", err);
      return res.status(500).json({ status: "error", message: "伺服器錯誤" });
    }

    if (results.length > 0) {
      return res.status(400).json({ status: "error", message: "Email 已被註冊" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const queryInsert = "INSERT INTO user (Email, name, password) VALUES (?, ?, ?)";
    db.query(queryInsert, [email, name, hashedPassword], (err) => {
      if (err) {
        console.error("註冊失敗:", err);
        return res.status(500).json({ status: "error", message: "伺服器錯誤" });
      }
      res.status(201).json({ status: "success", message: "註冊成功" });
    });
  });
});

// 登入 POST
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ status: "error", message: "請提供 Email 和密碼" });
  }

  const query = "SELECT * FROM user WHERE Email = ?";
  db.query(query, [email], async (err, results) => {
    if (err) {
      console.error("資料庫錯誤:", err);
      return res.status(500).json({ status: "error", message: "伺服器錯誤" });
    }

    if (results.length === 0) {
      return res.status(400).json({ status: "error", message: "使用者不存在" });
    }

    const user = results[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ status: "error", message: "密碼錯誤" });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ status: "success", token, message: "登入成功" });
  });
});

// 登出 GET
router.get("/logout", (req, res) => {
  // 簡單的前端處理方式：刪除 JWT Token
  res.json({ status: "success", message: "登出成功" });
});

module.exports = router;
