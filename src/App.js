import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Item from "./pages/Item";
import Shop from "./pages/Shop";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/shop" element={<Shop/>}></Route>
          <Route path="/shop/:id" element={<Item/>}></Route>
          <Route path="/cart" element={<Cart/>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
