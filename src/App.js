import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login'
import Register from './Register'
import Products from './Products'
import Protected from './Protected'

function App() {
  return (
    <div className="App">
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<Protected testprop={<Products />} />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
