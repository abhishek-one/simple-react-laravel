import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login'
import Register from './Register'
import AddProduct from './Add Product'
import DeleteProduct from './Delete Product'
import UpdateProduct from './Update Product'
import Protected from './Protected'


function App() {
  return (
    <div className="App">
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add" element={<Protected testprop={<AddProduct />} />} />
        <Route path="/delete" element={<Protected testprop={<DeleteProduct />} /> } />
        <Route path="/update" element={<Protected testprop={<UpdateProduct />} />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
