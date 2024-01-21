import { useEffect, useState, useCallback } from 'react';
import Header from './Header';
import Popup from './Popup';
import Button from 'react-bootstrap/Button';

function Products() {
  const [modalShow, setModalShow] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchProducts = useCallback(async () => {
    setLoading(true);

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/view-products?page=${currentPage}`, {
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
      console.log('result', resultData);

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
    fetchProducts();
  }, [fetchProducts, currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
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

          <Popup show={modalShow} onHide={() => setModalShow(false)} />

          <div className="d-flex">
            <input type="text" className="form-control" />
            <button className="btn btn-secondary btn-sm">Search</button>
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
                      src={`http://127.0.0.1:8000/images/${product.image}`  || 'placeholder-image-url'}
                      alt="Product"
                      style={{ width: '85px'}}
                    />
                  </td>
                  <td>
                    <button className="btn btn-info btn-sm m-1">Edit</button>
                    <button className="btn btn-danger btn-sm m-1">Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">{loading ? 'Loading...' : 'No products found.'}</td>
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
              className={`btn btn-primary btn-sm m-2 ${index + 1 === currentPage ? 'active' : ''}`}
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
