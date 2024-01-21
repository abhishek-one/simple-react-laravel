import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function Popup(props) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {

  // Clear the form when the component mounts (popup loads)

    setName("");
    setImage("");
    setErrors({});
  }, [props.show]);

  // Run this effect when the "show" prop changes

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update the state based on the input name

    if (name === "name") {
      setName(value);
    } else if (name === "image") {
      setImage(e.target.files[0]);
    }
  };

  const validateForm = () => {
    let newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    } else {
      newErrors.name = "";
    }

    // if (!image) {
    //   newErrors.image = 'Image is required';
    // } else {
    //   newErrors.image = '';
    // }

    setErrors(newErrors);

    return Object.keys(newErrors).every((key) => newErrors[key] === "");
  };

  const AddProduct = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", image);

      try {
        const result = await fetch("http://127.0.0.1:8000/api/create-product", {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          mode: "cors",
          body: formData,
        });

        const resultData = await result.json();
        console.warn("result", resultData);

        if (resultData.status === 1) {
          props.onHide();
        } else {
          console.log(resultData);
        }
      } catch (error) {
        console.error("Error occurred:", error);
      }
    } else {
      console.log("Form validation failed");
    }
  };


  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <form onSubmit={AddProduct}>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Add Product Details
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <label className="pb-2">Product name</label>
              <input
                className="form-control"
                placeholder="Please enter product name"
                name="name"
                type="text"
                value={name}
                onChange={handleInputChange}
              />
              {errors.name && (
                <span
                  style={{ color: "red", fontSize: "13px", paddingLeft: "1%" }}
                >
                  {errors.name}
                </span>
              )}

              <br />
              <div className="">
                <div>
                  <label className="pb-2">Upload Logo</label>
                </div>
                <div>
                  <input
                    type="file"
                    name="image"
                    onChange={handleInputChange}
                    // value={image} // Don't set the value for file inputs
                  />
                </div>
                {errors.image && (
                  <span
                    style={{
                      color: "red",
                      fontSize: "13px",
                      paddingLeft: "1%",
                    }}
                  >
                    {errors.image}
                  </span>
                )}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button className="btn btn-primary" type="submit">
              Add
            </Button>
            <Button className="btn btn-secondary" onClick={props.onHide}>
              Close
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default Popup;
