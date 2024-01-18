import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

function Register() {

    const redirect = useNavigate();

    useEffect(()=>{
        if(localStorage.getItem('details')){
            redirect("/add");
        }
    })
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function signUp() {
    let data = { name, email, password };
    let result = await fetch("http://127.0.0.1:8000/api/create-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });
    result = await result.json();
    console.warn("result", result);
    localStorage.setItem("details", JSON.stringify(result));
    redirect("/add");
  }

  return (
    <>
      <Header />
      <Form className="col-6 m-auto text-start">
        <h1>Register</h1>

        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="button" onClick={signUp}>
          Submit
        </Button>
      </Form>
    </>
  );
}
export default Register;
