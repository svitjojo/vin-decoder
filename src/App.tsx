import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { Header } from "./components/Header";
import HomePage from "./routes/HomePage/HomePage";
import ErrorPage from "./routes/ErrorPage";
import { VariablesListPage } from "./routes/VariablesListPage/VariablesListPage";
import VariablePage from "./routes/VariablePage/VariablePage";

const App = () => {
  return (
    <>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />

          <Route path="variables">
            <Route index element={<VariablesListPage />} />
            <Route path=":variableId" element={<VariablePage />} />
          </Route>
          
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
