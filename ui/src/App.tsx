import { Routes, Route } from "react-router-dom"
import Signup from "./pages/Signup"
import Signin from "./pages/Signin"
import Home from "./pages/Home"
import Portfolio from "./pages/Portfolio"
import Transactions from "./pages/Transactions"
import Transfer from "./pages/Transfer"
import Deposit from "./pages/Deposit"

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/deposit" element={<Deposit />} />
      <Route path="/portfolio" element={<Portfolio />} />
      <Route path="/transfer-money" element={<Transfer />} />
      <Route path="/all-transactions" element={<Transactions />} />
    </Routes>
  )
}

export default App
