import Header from "./Header";

function Products() {
  return (
    <div>
      <Header />
      <div className="container">
        <div className="d-flex justify-content-between pt-5 pb-4">
          <button className="btn btn-primary rounded-0 btn-sm min-inline-fit-content">+ Add Product</button>
          <div className="d-flex">
              <input type="text" className="form-control"/>
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
            <tr>
              <th>1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>
                <button className="btn btn-info btn-sm mx-1">Edit</button>
                <button className="btn btn-danger btn-sm mx-1">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Products;
