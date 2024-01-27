import { useEffect, useState, useCallback } from 'react';
import Header from './Header';
import Button from 'react-bootstrap/Button';
import Modal from "react-bootstrap/Modal";

function Products() {
  const [modalShow, setModalShow] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [errors, setErrors] = useState({});
  const [mode, setMode] = useState('add');
  const [productId, setProductId] = useState('');
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setName("");
    setImage("");
    setErrors({});
  }, [modalShow]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

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

    setErrors(newErrors);

    return Object.keys(newErrors).every((key) => newErrors[key] === "");
  };

  async function AddProduct(e){
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

        if (resultData.status === 1) {
          setModalShow(false);
          fetchProducts(searchQuery);
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

  async function EditProduct(e, id){
    e.preventDefault();

    if (validateForm()) {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", image);

      try {
        const result = await fetch(`${'http://127.0.0.1:8000/api/edit-product/'+id}`, {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          mode: "cors",
          body: formData,
        });

        const resultData = await result.json();

        if (resultData.status === 1) {
          setModalShow(false);
          fetchProducts(searchQuery);
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

  async function DeleteProduct(e, id){
    e.preventDefault();

    let data = {id};

    try {
      const result = await fetch("http://127.0.0.1:8000/api/delete-product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        mode: "cors",
        body: JSON.stringify(data),
      });

      const resultData = await result.json();

      if (resultData.status === 1) {
        fetchProducts(searchQuery);
      } else {
        console.log(resultData);
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  const fetchProducts = useCallback(async (searchQuery) => {

    setLoading(true);

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/view-products?page=${currentPage}&search=${searchQuery}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
        mode: 'cors',
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch products. Status: ${response.status}`);
      }

      const resultData = await response.json();

      if (resultData.data) {
        setProducts(resultData.data.data);
        setTotalPages(resultData.data.last_page);
      } else {
        throw new Error('Invalid data format received from the server.');
      }
    } catch (error) {
      console.error('Error occurred:', error.message);
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchProducts(searchQuery);
  }, [fetchProducts, currentPage, searchQuery]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSearch = () => {
    fetchProducts(searchQuery);
  };

  return (
    <div>
      <Header />

      <div className="container">
        <div className="d-flex justify-content-between pt-5 pb-4">
          <Button
            className="btn btn-primary rounded-0 btn-sm min-inline-fit-content"
            variant="primary"
            onClick={() => setModalShow(true)}
          >
            + Add Product
          </Button>

          <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={modalShow}
            onHide={() => setModalShow(false)}
          >
            <form
              onSubmit={(e) =>
                mode === "edit" ? EditProduct(e, productId) : AddProduct(e)
              }
            >
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
                      style={{
                        color: "red",
                        fontSize: "13px",
                        paddingLeft: "1%",
                      }}
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
                <Button
                  className="btn btn-secondary"
                  onClick={() => setModalShow(false)}
                >
                  Close
                </Button>
              </Modal.Footer>
            </form>
          </Modal>

          <div className="d-flex">
            <input
              type="text"
              className="form-control"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="btn btn-secondary btn-sm" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Company</th>
              <th>Logo</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(products) && products.length > 0 ? (
              products.map((product, index) => (
                <tr key={index}>
                  <th>{(currentPage - 1) * 10 + index + 1}</th>
                  <td>{product.name}</td>
                  <td>
                    <img
                      src={
                        product.image
                          ? `http://127.0.0.1:8000/images/${product.image}`
                          : `http://127.0.0.1:3000/images/default.png`
                      }
                      alt="Product"
                      style={{ width: "85px" }}
                    />
                  </td>
                  <td>
                    <button
                      className="btn btn-info btn-sm m-1"
                      onClick={(e) => {
                        setMode("edit");
                        setModalShow(true);
                        setProductId(product.id);
                      }}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-danger btn-sm m-1"
                      onClick={(e) => DeleteProduct(e, product.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">
                  {loading ? "Loading..." : "No products found."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="d-flex justify-content-start">
          <button
            className="btn btn-primary btn-sm m-2"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`btn btn-primary btn-sm m-2 ${
                index + 1 === currentPage ? "active" : ""
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            className="btn btn-primary btn-sm m-2"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Products;
