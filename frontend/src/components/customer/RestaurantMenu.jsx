import React, { useContext, useState } from "react";
import { ResturantContext } from "../Contexts/ResturantContext";
import { UserContext } from "../Contexts/UserContext";
import { useParams } from "react-router";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Toast,
  ToastContainer,
} from "react-bootstrap";

const RestaurantMenu = () => {
  let { restaurantName } = useParams();
  const { Items } = useContext(ResturantContext);
  const { addItem } = useContext(UserContext);
  const [ShowNotification, setShowNotification] = useState(false);
  const [ShowNotificationMsg, setShowNotificationMsg] = useState("");
  const [ShowNotificationVariant, setShowNotificationVariant] = useState("");
  const [addedItems, setAddedItems] = useState({});

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

  const updateQty = (mode, id) => {
    if (mode === "add") {
      let currentItemQTY = {};
      if (!addedItems.hasOwnProperty(id)) {
        currentItemQTY[id] = 1;
        setAddedItems({ ...addedItems, ...currentItemQTY });
      } else {
        currentItemQTY[id] = addedItems[id] += 1;
        setAddedItems({ ...addedItems, ...currentItemQTY });
      }
    } else {
      let currentItemQTY = {};
      if (addedItems.hasOwnProperty(id) && addedItems[id] > 0) {
        currentItemQTY[id] = addedItems[id] -= 1;
        setAddedItems({ ...addedItems, ...currentItemQTY });
      }
    }
  };
  const handleAddToCart = (
    itemName,
    itemPrice,
    itemDescription,
    itemCategory,
    id
  ) => {
    if (addedItems[id] > 0) {
      addItem({
        itemName: itemName,
        itemPrice: itemPrice,
        itemDescription: itemDescription,
        itemQuantity: addedItems[id],
        itemCategory: itemCategory,
        totalPrice: itemPrice * addedItems[id],
      });
      toggleNotification("Woohoo, Item has been added to cart!", "success");
    } else {
      toggleNotification("Warning, Select atleast 1 item!", "danger");
    }
  };
  return (
    <Container className="mt-3">
      <h3>{restaurantName}</h3>
      <p>You can order the following items availible in the menu</p>
      <ToastContainer position="top-end" style={{ marginTop: "70px" }}>
        <Toast
          show={ShowNotification}
          onClose={toggleNotification}
          bg={ShowNotificationVariant.toLowerCase()}
          className="text-light"
        >
          <Toast.Header>
            <strong className="me-auto">Notifcation</strong>
          </Toast.Header>
          <Toast.Body>{ShowNotificationMsg}</Toast.Body>
        </Toast>
      </ToastContainer>
      {Items.map((item) => {
        if (item.items.length > 0) {
          return (
            <Row key={item._id} style={{ textAlign: "left" }}>
              <p
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
                className="mt-2"
              >
                {item.categoryName}
              </p>
              {item.items.map((dish, i) => {
                return (
                  <Col md={3} className="mt-2" key={dish._id}>
                    <Card style={{ width: "18rem" }}>
                      <Card.Img
                        variant="top"
                        className="p-2"
                        style={{ height: "200px", width: "250px" }}
                        src="https://png.pngtree.com/png-vector/20191129/ourmid/pngtree-hand-drawn-fast-food-doodle-vector-set-of-fast-food-vector-png-image_2046737.jpg"
                      />
                      <Card.Body>
                        <Card.Title>{dish.itemName}</Card.Title>
                        <Card.Text>{dish.itemDescription}</Card.Text>
                        <Card.Text>Rs {dish.itemPrice}</Card.Text>
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
                          className="logout-button"
                        >
                          <Button
                            className="logout-button"
                            variant="primary"
                            style={{ fontSize: "25px" }}
                            onClick={() => updateQty("add", dish._id)}
                          >
                            +
                          </Button>

                          <div className="logout-button p-2">
                            {addedItems.hasOwnProperty(dish._id)
                              ? addedItems[dish._id]
                              : 0}
                          </div>

                          <Button
                            className="logout-button"
                            style={{ fontSize: "25px" }}
                            variant="primary"
                            onClick={() => updateQty("deduct", dish._id)}
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
                              dish.itemName,
                              dish.itemPrice,
                              dish.itemDescription,
                              item.categoryName,
                              dish._id
                            )
                          }
                        >
                          Add to cart
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          );
        } else {
          return null;
        }
      })}
    </Container>
  );
};

export default RestaurantMenu;
