
import './App.css';
import Navbar from './commponet/Navbar';
import { Route, Routes } from 'react-router-dom'
import Home from './commponet/Home'
import Cart from './commponet/Cart';
function App() {
  return (
    <div>
      <div className="bg-slate-900 text-white">
        <Navbar />
      </div>
      <Routes>
        <Route  path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
