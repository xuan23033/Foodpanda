import React, { useContext, useState, useEffect } from "react";
import { ResturantContext } from "../Contexts/ResturantContext";
import { UserContext } from "../Contexts/UserContext";
import { useParams } from "react-router";
import { Container, Row, Col, Card, Button, Toast, ToastContainer } from "react-bootstrap";

const RestaurantMenu = () => {
  const { restaurantName } = useParams(); // 获取餐厅名称
  const decodedRestaurantName = decodeURIComponent(restaurantName);
  const { Items } = useContext(ResturantContext); // 从上下文中获取餐厅菜单项目
  const { addItem } = useContext(UserContext);
  const [ShowNotification, setShowNotification] = useState(false);
  const [ShowNotificationMsg, setShowNotificationMsg] = useState("");
  const [ShowNotificationVariant, setShowNotificationVariant] = useState("");
  const [addedItems, setAddedItems] = useState({});
  const [restaurantMenu, setRestaurantMenu] = useState(null); // 用于存储当前餐厅的菜单

  // 通知显示与隐藏
  const toggleNotification = (msg, variant) => {
    setShowNotification(true);
    setShowNotificationMsg(msg);
    setShowNotificationVariant(variant);
    setTimeout(() => {
      setShowNotification(false);
      setShowNotificationMsg("");
      setShowNotificationVariant("");
    }, 2000);
  };

  // 确保数量更新的逻辑正常
  const updateQty = (mode, id) => {
    let currentItemQTY = {};
    if (mode === "add") {
      if (!addedItems.hasOwnProperty(id)) {
        currentItemQTY[id] = 1;
      } else {
        currentItemQTY[id] = addedItems[id] + 1;
      }
    } else {
      if (addedItems.hasOwnProperty(id) && addedItems[id] > 0) {
        currentItemQTY[id] = addedItems[id] - 1;
      }
    }
    setAddedItems({ ...addedItems, ...currentItemQTY });
  };

  // 处理添加菜品到购物车的逻辑
  const handleAddToCart = (itemName, itemPrice, itemDescription, itemCategory, id) => {
    if (addedItems[id] > 0) {
      addItem({
        itemName,
        itemPrice,
        itemDescription,
        itemQuantity: addedItems[id],
        itemCategory,
        totalPrice: itemPrice * addedItems[id],
      });
      toggleNotification("Woohoo, Item has been added to cart!", "success");
    } else {
      toggleNotification("Warning, Select at least 1 item!", "danger");
    }
  };

  // 在组件加载时，根据餐厅名称过滤出对应的菜单项
  useEffect(() => {
    // 根据餐厅名称加载菜单数据
    fetchMenuItems(decodedRestaurantName);
  }, [decodedRestaurantName]);

  const fetchMenuItems = async (restaurantName) => {
    const response = await fetch(`http://localhost:5000/api/menu/items/${encodeURIComponent(restaurantName)}`);
    const data = await response.json();
    setRestaurantMenu(data); // 更新菜单数据
  };

  return (
    <Container className="mt-3">
      <h3>{restaurantName}</h3>
      <p>You can order the following items available in the menu</p>

      <ToastContainer position="top-end" style={{ marginTop: "70px" }}>
        <Toast
          show={ShowNotification}
          onClose={toggleNotification}
          bg={ShowNotificationVariant.toLowerCase()}
          className="text-light"
        >
          <Toast.Header>
            <strong className="me-auto">Notification</strong>
          </Toast.Header>
          <Toast.Body>{ShowNotificationMsg}</Toast.Body>
        </Toast>
      </ToastContainer>

      {/* 渲染菜单项 */}
      <Row>
        {/* 确保 `restaurantMenu` 是有效的再进行渲染 */}
        {restaurantMenu && restaurantMenu.items && restaurantMenu.items.length === 0 ? (
          <p>No items available in the menu.</p>
        ) : (
          restaurantMenu && restaurantMenu.items.map((dish) => (
            <Col md={3} key={dish.item_id} className="mt-2">
              <Card style={{ width: "18rem" }}>
                <Card.Img
                  variant="top"
                  className="p-2"
                  style={{ height: "200px", width: "250px" }}
                  src={dish.ImageURL || "https://via.placeholder.com/150"}
                />
                <Card.Body>
                  <Card.Title>{dish.item_name}</Card.Title>
                  <Card.Text>{dish.description}</Card.Text>
                  <Card.Text>Rs {dish.price}</Card.Text>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-evenly",
                      marginTop: "10px",
                      border: "3px solid #D70F64",
                      padding: "5px",
                    }}
                  >
                    <Button
                      className="logout-button"
                      variant="primary"
                      style={{ fontSize: "25px" }}
                      onClick={() => updateQty("add", dish.item_id)}
                    >
                      +
                    </Button>

                    <div className="logout-button p-2">
                      {addedItems[dish.item_id] || 0}
                    </div>

                    <Button
                      className="logout-button"
                      style={{ fontSize: "25px" }}
                      variant="primary"
                      onClick={() => updateQty("deduct", dish.item_id)}
                    >
                      -
                    </Button>
                  </div>
                  <Button
                    variant="primary"
                    className="form-button"
                    style={{ width: "100%" }}
                    onClick={() =>
                      handleAddToCart(
                        dish.item_name,
                        dish.price,
                        dish.description,
                        restaurantMenu.categoryName,
                        dish.item_id
                      )
                    }
                  >
                    Add to cart
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default RestaurantMenu;
