import React from "react";
import { Row, Col, Accordion } from "react-bootstrap";

const Questions = [
  {
    id: 1,
    question: "What is foodpanda?",
    answer:
      "Foodpanda is a simple service to order food from a variety of restaurants online. Enjoy different cuisines and flavours delivered to your door step.",
  },
  {
    id: 2,
    question: "How can we order food through it?",
    answer:
      "Build up your meal by choosing from any of your favorite restaurants, browse the menu and select the items you will like to order. If options are required, e.g pizza toppings, you will be asked to choose them one you click on an item. Your items will appear on your cart on the right.",
  },
  {
    id: 3,
    question: "Does foodpanda offers cashless payments?",
    answer:
      "Yes we do!. Our payment partners: Visa, Mastercard, American Express, Google Pay, PayPal, Apple Pay;",
  },
  {
    id: 4,
    question: "What is the refund process?",
    answer:
      "For orders cancelled before delivery, foodpanda will process a refund of any rider tip paid by you to the payment method used for the order. Refunds will require time to be processed by us, your credit card company and/or your bank.",
  },
];

const FAQ = () => {
  return (
    <div>
      <Accordion defaultActiveKey="0">
        <Row className="d-flex flex-column justify-content-center align-items-center">
          {Questions.map((Question) => {
            return (
              <Col md={12} style={{ maxWidth: "800px" }} key={Question.id}>
                <Accordion.Item eventKey={Question.id}>
                  <Accordion.Header className="AccordationHeader">
                    {Question.question}
                  </Accordion.Header>
                  <Accordion.Body>{Question.answer}</Accordion.Body>
                </Accordion.Item>
              </Col>
            );
          })}
        </Row>
      </Accordion>
    </div>
  );
};

export default FAQ;
