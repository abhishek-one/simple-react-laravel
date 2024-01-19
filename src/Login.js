import Header from './Header';
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";




function Login(){
  const redirect = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("details")) {
      redirect("/products");
    }
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function loginCheck() {
    let data = { email, password };
    let result = await fetch("http://127.0.0.1:8000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(data),
    });
    result = await result.json();
    console.warn("result", result.status);
    if(result.status === 'success'){
        localStorage.setItem("details", JSON.stringify(result));
        redirect("/products");

    }else{
        document.getElementById('errors').innerHTML = '';
        document.getElementById('errors').innerHTML = result.message;
    }
  }


  return (
    <>
      <Header />
      <div className='col-md-6 col-11 border m-auto mt-5 p-4'>
        <Form className="m-auto text-start">
          <h1>Login</h1>

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
          <div id='errors'></div>
          <Button variant="primary" type="button" onClick={loginCheck}>
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
}
export default Login;