import ProtectedRoute from "./components/ProtectedRoute";
import { Routes, Route } from "react-router-dom";
import Transactions from "./pages/Transactions";
import Portfolio from "./pages/Portfolio";
import { Toaster } from "react-hot-toast";
import Transfer from "./pages/Transfer";
import Deposit from "./pages/Deposit";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Home from "./pages/Home";
import TransferMoney from "./pages/TransferMoney";

function App() {

  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        ></Route>

        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/deposit" element={<Deposit />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/transfer" element={<Transfer />} />
        <Route path="/transfer-money" element={<TransferMoney />} />
        <Route path="/all-transactions" element={<Transactions />} />
        <Route path="*" element={<h1> Page Not Found </h1>} />
      </Routes>
    </>
  );
}

export default App;
