import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useState } from "react";
import axiosService from "../Service/axiosService";

const status = {
  POSITIVE: "positive",
  NEGATIVE: "negative",
};

export const Home = () => {
  const [info, setInfo] = useState({
    Preg: null,
    Plas: null,
    Pres: null,
    Skin: null,
    Insu: null,
    Mass: null,
    Pedi: null,
    Age: null,
  });
  const [message, setMessage] = useState("");
  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };
  const [diagnoseResult, setDiagnoseResult] = useState(
    "Enter your number to calculate"
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDiagnoseResult("Calculating");
    setMessage("");
    let finalMessage = "";
    for (const [key, value] of Object.entries(info)) {
      if (value === null || isNaN(value)) {
        finalMessage += key + ", ";
      }
    }
    if (finalMessage) {
      setMessage(finalMessage + "isn't a valid number");
      return;
    }

    const { data } = await axiosService.diagnose(info);
    setDiagnoseResult(data);
  };

  return (
    <Container className="border mt-4 p-3">
      <h2 className="text-center">Diabetes Dialect</h2>
      <Form className="mt-4">
        <Row>
          <Col sm={12} md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Number of pregnant times</Form.Label>
              <Form.Control
                type="number"
                name="Preg"
                onChange={handleChange}
                placeholder="Enter your value"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>
                Plasma glucose concentration after 2 hours
              </Form.Label>
              <Form.Control
                type="number"
                name="Plas"
                onChange={handleChange}
                placeholder="Enter your value"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Diastolic blood pressure</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter your value"
                name="Pres"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Triceps skin fold thickness</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter your value"
                name="Skin"
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col sm={12} md={6}>
            <Form.Group className="mb-3">
              <Form.Label>2-Hour serum insulin</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter your value"
                name="Insu"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Body mass index</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter your value"
                name="Mass"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Diabetes pedigree function</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter your value"
                name="Pedi"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter your value"
                name="Age"
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mx-0 mt-3">
          {message && (
            <div className="box box-fail mb-3 ">
              <span>{message}</span>
            </div>
          )}
          <Button
            variant="success"
            type="submit"
            onClick={handleSubmit}
            className="py-3"
          >
            <span className="h6">Let check the result</span>
          </Button>
        </Row>
        <Row className="mx-0 mt-4">
          <Col
            sm={12}
            md={4}
            className="d-flex justify-content-between align-items-center"
          >
            <span className="h5">Your result displayed here:</span>
          </Col>
          <Col
            sm={12}
            md={8}
            className={`answer-box ${
              diagnoseResult.includes(status.POSITIVE)
                ? "answer-box-positive"
                : ""
            } 
            
            ${
              diagnoseResult.includes(status.NEGATIVE)
                ? "answer-box-negative"
                : ""
            }
            `}
          >
            <span>{diagnoseResult}</span>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};
