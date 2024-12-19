require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
const users = require("./routes/users");

const app = express();
const port = process.env.PORT || 5000;

// 中間件
app.use(cors({ origin: "http://localhost:3000" }));
app.use(bodyParser.json());
app.use(express.json());
app.use("/users", users);

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

// 查詢用戶的歷史訂單
app.get("/api/orders/:userId", (req, res) => {
  const { userId } = req.params;
  const query = `
    SELECT 
      orders.order_id,
      orders.items,
      orders.total_price,
      orders.order_status,
      orders.order_date,
      restaurants.name AS restaurant_name
    FROM orders
    JOIN restaurants ON orders.restaurant_id = restaurants.restaurant_id
    WHERE orders.user_id = ?
    ORDER BY orders.order_date DESC
  `;
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Database error (fetch orders):", err);
      res.status(500).json({ error: "Failed to fetch orders" });
    } else {
      res.json(results);
    }
  });
});

// 新增歷史訂單
app.post("/api/orders", (req, res) => {
  const userId = 1; // 固定使用者 ID，無需登入
  const { restaurant_id, total_price } = req.body;

  // 假設現在時間為訂單日期
  const order_date = new Date().toISOString().slice(0, 19).replace("T", " ");

  const query = `
    INSERT INTO orders (user_id, restaurant_id, total_price, order_date)
    VALUES (?, ?, ?, ?)
  `;

  db.query(query, [userId, restaurant_id, total_price, order_date], (err, result) => {
    if (err) {
      console.error("新增訂單失敗：", err);
      res.status(500).json({ error: "Failed to add order" });
    } else {
      res.status(201).json({ message: "Order added successfully", orderId: result.insertId });
    }
  });
});

app.get("/api/orders/:userId", (req, res) => {
  const { userId } = req.params;

  const query = `
    SELECT o.order_id, o.total_price, o.order_date, r.name AS restaurant_name, 
           GROUP_CONCAT(CONCAT(mi.name, ' x', oi.quantity) SEPARATOR ', ') AS items
    FROM orders o
    JOIN restaurants r ON o.restaurant_id = r.restaurant_id
    JOIN order_items oi ON o.order_id = oi.order_id
    JOIN menu_items mi ON oi.menu_item_id = mi.menu_item_id
    WHERE o.user_id = ?
    GROUP BY o.order_id
  `;

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("查詢歷史訂單失敗:", err);
      res.status(500).json({ error: "Failed to fetch orders" });
    } else {
      res.json(results);
    }
  });
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

// 啟動服務器
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
