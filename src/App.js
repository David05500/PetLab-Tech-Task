import React from "react"
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./components/Home";
import Products from "./components/Products";
import Header from "./components/shared/header";
import {ProductsProvider} from "./context/Products/ProductsContext"

const App = () => (
  <Router>
    <ProductsProvider>
      <div className="relative">
        <Header />
        <Routes>
          <Route path="/products" element={<Products/>} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </ProductsProvider>
  </Router>
)
export default App
