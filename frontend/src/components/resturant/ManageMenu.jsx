import React, { useContext, useState, useRef } from "react";
import { Container, Row, Col, Table, Form, Button } from "react-bootstrap";
import { ResturantContext } from "../Contexts/ResturantContext";

const ManageMenu = () => {
  const {
    Items,
    addCategory,
    updateCategory,
    deleteCategory,
    addItem,
    updateItem,
    deleteItem,
  } = useContext(ResturantContext);

  const [validatedItemForm, setvalidatedItemForm] = useState(false);
  const [validatedCategoryForm, setvalidatedCategoryForm] = useState(false);

  const [Category, setCategory] = useState("");

  const [Id, setId] = useState("");
  const [CategoryName, setCategoryName] = useState("");
  const [ItemName, setItemName] = useState("");
  const [ItemDescription, setItemDescription] = useState("");
  const [ItemPrice, setItemPrice] = useState("");

  const selectRow = (category, item) => {
    console.log(category, item);
    setId(item._id);
    setCategoryName(category);
    setItemDescription(item.itemDescription);
    setItemName(item.itemName);
    setItemPrice(item.itemPrice);
  };

  const formRef = useRef();
  const handleItemInsertion = (
    e,
    CategoryName,
    ItemName,
    ItemDescription,
    ItemPrice
  ) => {
    const form = formRef.current;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      addItem(CategoryName, ItemName, ItemDescription, ItemPrice);
      e.preventDefault();
      setCategoryName("");
      setItemDescription("");
      setItemName("");
      setItemPrice("");
      setvalidatedItemForm(false);
      form.reset();
    }
  };
  const handleItemUpdate = (
    e,
    id,
    CategoryName,
    ItemName,
    ItemDescription,
    ItemPrice
  ) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    updateItem(id, CategoryName, ItemName, ItemDescription, ItemPrice);
    e.preventDefault();
    setCategoryName("");
    setItemDescription("");
    setItemName("");
    setItemPrice("");
    setvalidatedItemForm(false);
    document.getElementById("item-form").reset();
  };
  const handleItemDeletion = (e, CategoryName, ItemName) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    deleteItem(CategoryName, ItemName);
    e.preventDefault();
    setCategoryName("");
    setItemDescription("");
    setItemName("");
    setItemPrice("");
    setvalidatedItemForm(false);
    document.getElementById("item-form").reset();
  };
  const handleCategoryInsertion = (e, CategoryName) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    addCategory(CategoryName);
    e.preventDefault();
    setCategory("");
    setvalidatedCategoryForm(false);
    document.getElementById("category-form").reset();
  };

  const handleCategoryUpdatation = (e, CategoryName) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    updateCategory(CategoryName);
    e.preventDefault();
    setCategory("");
    setvalidatedCategoryForm(false);
    document.getElementById("category-form").reset();
  };

  const handleCategoryDeletion = (e, CategoryName) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    deleteCategory(CategoryName);
    e.preventDefault();
    setCategory("");
    setvalidatedCategoryForm(false);
    document.getElementById("category-form").reset();
  };

  return (
    <Container className="mt-5">
      <h3 className="mb-4" style={{ textDecoration: "underline" }}>
        Manage your resturant's menu
      </h3>
      <Row>
        <Col md={4} className="register-card mt-2">
          <Row>
            <Form
              noValidate
              validated={validatedCategoryForm}
              id="category-form"
            >
              <Form.Group
                className="mt-3"
                controlId="category"
                style={{ textAlign: "left" }}
              >
                <Form.Label style={{ marginLeft: "5px", fontWeight: "bold" }}>
                  Category Name
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ex. Drinks"
                  onChange={(e) => setCategory(e.target.value)}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Category Name is required
                </Form.Control.Feedback>
                <Form.Control.Feedback type="valid">
                  Looks Good!
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mt-3 d-flex justify-content-around">
                <Button
                  className="crud-button"
                  onClick={(event) => handleCategoryInsertion(event, Category)}
                >
                  Add Category
                </Button>
                <Button
                  className="crud-button"
                  onClick={(event) => handleCategoryUpdatation(event, Category)}
                >
                  Update Category
                </Button>
                <Button
                  className="crud-button"
                  onClick={(event) => handleCategoryDeletion(event, Category)}
                >
                  Delete Category
                </Button>
              </Form.Group>
            </Form>
          </Row>
          <Row>
            <Form validated={validatedItemForm} ref={formRef} id="item-form">
              <Form.Group
                className="mt-3"
                controlId="itemName"
                style={{ textAlign: "left" }}
              >
                <Form.Label style={{ marginLeft: "5px", fontWeight: "bold" }}>
                  Item Name
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ex. Pepsi"
                  onChange={(e) => setItemName(e.target.value)}
                  value={ItemName}
                  required
                />
                <Form.Control.Feedback type="valid">
                  Looks Good!
                </Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Item Name is required
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group
                className="mt-3"
                controlId="itemDesc"
                style={{ textAlign: "left" }}
              >
                <Form.Label style={{ marginLeft: "5px", fontWeight: "bold" }}>
                  Item Description
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ex. 1.5 Liter Bottle"
                  onChange={(e) => setItemDescription(e.target.value)}
                  value={ItemDescription}
                  required
                />
                <Form.Control.Feedback type="valid">
                  Looks Good!
                </Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Item Description is required
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group
                className="mt-3"
                controlId="itemName"
                style={{ textAlign: "left" }}
              >
                <Form.Label style={{ marginLeft: "5px", fontWeight: "bold" }}>
                  Item Price
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ex. 70"
                  onChange={(e) => setItemPrice(e.target.value)}
                  value={ItemPrice}
                  required
                />
                <Form.Control.Feedback type="valid">
                  Looks Good!
                </Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Item Price is required
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group
                className="mt-3"
                controlId="itemPrice"
                style={{ textAlign: "left" }}
              >
                <Form.Label style={{ marginLeft: "5px", fontWeight: "bold" }}>
                  Category
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ex. Drinks"
                  onChange={(e) => setCategoryName(e.target.value)}
                  value={CategoryName}
                  required
                />
                <Form.Control.Feedback type="valid">
                  Looks Good!
                </Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Category Name is required
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mt-3 d-flex justify-content-around">
                <Button
                  className="text-light crud-button"
                  onClick={(event) =>
                    handleItemInsertion(
                      event,
                      CategoryName,
                      ItemName,
                      ItemDescription,
                      ItemPrice
                    )
                  }
                >
                  Add Item
                </Button>
                <Button
                  className="crud-button"
                  onClick={(event) => {
                    handleItemUpdate(
                      event,
                      Id,
                      CategoryName,
                      ItemName,
                      ItemDescription,
                      ItemPrice
                    );
                  }}
                >
                  Update Item
                </Button>
                <Button
                  className="crud-button text-light"
                  onClick={(event) =>
                    handleItemDeletion(event, CategoryName, ItemName)
                  }
                >
                  Delete Item
                </Button>
              </Form.Group>
            </Form>
          </Row>
        </Col>
        <Col md={8} className="mt-2">
          <Table
            striped
            bordered
            hover
            responsive
            style={{ textAlign: "left", padding: "5px" }}
          >
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Item Price</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {Items.map((Item) => {
                return Item.items.map((item) => {
                  return (
                    <tr
                      key={item._id}
                      onClick={() => selectRow(Item.categoryName, item)}
                    >
                      <td>{item.itemName}</td>
                      <td>{item.itemPrice}</td>
                      <td>{Item.categoryName}</td>
                    </tr>
                  );
                });
              })}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default ManageMenu;
