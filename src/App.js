import React from "react"
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Products from "./components/Products";
import Header from "./components/shared/header";
import {ProductsProvider} from "./context/Products/ProductsContext"
import logo from './logo.svg';

const App = () => (
  <Router>
    <ProductsProvider>
      <div className="relative">
        <Header />
        <Routes>
          <Route path="/products" element={<Products/>} />
          <Route path="/" element={
          <div className="flex flex-col justify-center items-center w-screen h-screen pb-24 pt-36">
            <h2 className="text-4xl font-base mt-24 mb-6 text-center">Front-end task for PetLab</h2>
            <p className="text-2xl font-base mb-6">by</p>
            <p className="text-4xl font-base mb-48 test">David Sarvasidze</p>
            <img src={logo} className="App-logo" alt="logo" />
          </div>
        } />
        </Routes>
      </div>
    </ProductsProvider>
  </Router>
)
export default App
