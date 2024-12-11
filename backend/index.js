require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

// 中間件
app.use(cors());
app.use(bodyParser.json());

// 建立數據庫連接池
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// 測試數據庫連接
db.getConnection((err, connection) => {
  if (err) {
    console.error("數據庫連接失敗:", err);
    process.exit(1);
  } else {
    console.log("成功連接到數據庫！");
    connection.release();
  }
});

// API 路由
app.get("/", (req, res) => {
  res.send("Food Delivery Backend is running!");
});

// 獲取所有餐廳
app.get("/api/restaurants", (req, res) => {
  const query = "SELECT * FROM restaurants";
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: "Failed to fetch restaurants" });
    } else {
      res.json(results);
    }
  });
});

// 添加餐廳
app.post("/api/restaurants", (req, res) => {
  const { name, description, image } = req.body;
  const query = "INSERT INTO restaurants (restaurant_id, name, full_address, phone, type) VALUES (?, ?, ?, ?, ?)";
  db.query(query, [name, description, image], (err, results) => {
    if (err) {
      res.status(500).json({ error: "Failed to add restaurant" });
    } else {
      res.status(201).json({ message: "Restaurant added successfully", id: results.insertId });
    }
  });
});

// 啟動服務器
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
