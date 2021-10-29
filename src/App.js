import React from "react";
import { useFormik } from "formik";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import Swal from 'sweetalert2'

function App() {
  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const myformik = useFormik({
    initialValues: {
      emailField: "",
      pswField: "",
    },
    onSubmit: (e) => {
      console.log(e);
      console.log(e.emailField);
      Swal.fire({
        title: 'Yeah!',
        text: 'Login Successful',
        icon: 'success',
        confirmButtonText: 'Cool'
      })
    },
    validate: (values) => {
      let errors = {};

      if (!values.emailField) {
        errors.email = "Fiel required";
      } else {
        if (!validateEmail(values.emailField)) {
          errors.email = "Username should be an email";
        }
      }

      if (!values.pswField) errors.password = "Required";

      return errors;
    },
  });

  return (
    <>
      <Container fluid className="my-container">
        <Row>
          <Col sm={12} className="my-flex">
            <Card style={{ width: "32rem", borderRadius: "20px" }}>
              <Card.Title>
                <h1 className="my-login-title">Login</h1>
              </Card.Title>
              <Card.Body>
                <form onSubmit={myformik.handleSubmit}>
                  <label for="emailField" className="form-label">
                    Email
                  </label>
                  <input
                    className="form-control form-control-lg"
                    id="emailField"
                    name="emailField"
                    type="text"
                    onChange={myformik.handleChange}
                    value={myformik.values.email}
                  />
                  {myformik.errors.email ? (
                      <div className="my-error">
                        {myformik.errors.email}
                      </div>
                    ) : null}
                  <label for="emailField" className="form-label mt-4">
                    Password
                  </label>
                  <input
                    className="form-control form-control-lg"
                    id="pswField"
                    name="pswField"
                    type="text"
                    onChange={myformik.handleChange}
                    value={myformik.values.password}
                  />
                  {myformik.errors.password ? (
                    <div className="my-error">
                      {myformik.errors.password}
                    </div>
                  ) : null}
                  <Button
                    style={{ width: "100%" }}
                    variant="warning"
                    className="mt-4"
                    id="submitBtn"
                    type="submit"
                    size="lg"
                  >
                    Submit
                  </Button>
                </form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
