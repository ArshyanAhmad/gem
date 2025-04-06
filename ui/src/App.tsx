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
        <Route path="/transfer-money" element={<Transfer />} />
        <Route path="/all-transactions" element={<Transactions />} />
      </Routes>
    </>
  );
}

export default App;
