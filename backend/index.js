require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
const port = process.env.PORT || 5000;

require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

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

// 註冊 API
app.post("/api/auth/register", async (req, res) => {
  const { email, name, password } = req.body;

  if (!email) return res.status(400).json({ error: "請提供 Email" });

  // 檢查 Email 是否存在
  const queryCheck = "SELECT * FROM users WHERE email = ?";
  db.query(queryCheck, [email], async (err, results) => {
    if (err) {
      console.error("資料庫錯誤:", err);
      return res.status(500).json({ error: "伺服器錯誤" });
    }

    if (results.length > 0) {
      return res.status(400).json({ error: "Email 已被使用" });
    }

    // 如果有提供密碼和姓名，執行註冊
    if (name && password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const queryInsert =
        "INSERT INTO users (name, email, password, account_status) VALUES (?, ?, ?, ?)";
      db.query(
        queryInsert,
        [name, email, hashedPassword, "active"],
        (err, result) => {
          if (err) {
            console.error("註冊錯誤:", err);
            return res.status(500).json({ error: "伺服器錯誤" });
          }
          res.status(201).json({ message: "註冊成功" });
        }
      );
    } else {
      res.status(200).json({ message: "請繼續輸入姓名和密碼" });
    }
  });
});

// 登入 API
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "請提供 Email 和密碼" });
  }

  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], async (err, results) => {
    if (err) {
      console.error("資料庫錯誤:", err);
      return res.status(500).json({ error: "伺服器錯誤" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Email 不存在" });
    }

    const user = results[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "密碼錯誤" });
    }

    const token = jwt.sign({ user_id: user.user_id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "登入成功", token });
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

app.get("/api/menu/items/:restaurantName", (req, res) => {
  const { restaurantName } = req.params;
  const decodedRestaurantName = decodeURIComponent(restaurantName);
  console.log("Decoded restaurantName:", decodedRestaurantName);

  // 查詢餐廳ID
  const queryRestaurant = "SELECT restaurant_id FROM restaurants WHERE name = ?";
  db.query(queryRestaurant, [restaurantName], (err, results) => {
    if (err) {
      console.error("Database error (fetch restaurant):", err);
      res.status(500).json({ error: "Failed to fetch restaurant data" });
      return;
    }

    if (results.length > 0) {
      const restaurantId = results[0].restaurant_id;

      // 查詢該餐廳的菜單
      const queryMenu = "SELECT * FROM menu_items WHERE restaurant_id = ?";
      db.query(queryMenu, [restaurantId], (err, menuItems) => {
        if (err) {
          console.error("Database error (fetch menu):", err);
          res.status(500).json({ error: "Failed to fetch menu items" });
          return;
        }

        if (menuItems.length === 0) {
          res.status(404).json({ error: "No menu items found for this restaurant" });
        } else {
          res.json({ items: menuItems });
        }
      });
    } else {
      res.status(404).json({ error: `Restaurant '${restaurantName}' not found` });
    }
  });
});



// 啟動服務器
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
