import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login'
import Register from './Register'
import AddProduct from './Add Product'
import DeleteProduct from './Delete Product'
import UpdateProduct from './Update Product'


function App() {
  return (
    <div className="App">
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add" element={<AddProduct />} />
        <Route path="/delete" element={<DeleteProduct />} />
        <Route path="/update" element={<UpdateProduct />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
