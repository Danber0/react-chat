import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Chat from "./pages/Chat";
import Home from "./pages/Home";

import "./App.scss";

function App() {
  const [userName, setUserName] = React.useState("");

  return (
    <div className="App">
      <Routes>
        <Route
          path="chat"
          element={
            userName.trim() ? (
              <Chat userName={userName} />
            ) : (
              <Navigate replace to="/" />
            )
          }
        />
        <Route index element={<Home setUserName={setUserName} />} />
      </Routes>
    </div>
  );
}

export default App;
