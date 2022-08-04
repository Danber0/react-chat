import React, { useState } from "react";
import "./Home.scss";
import { useNavigate } from "react-router-dom";

type IHome = {
  setUserName: React.Dispatch<string>;
};

const Home: React.FC<IHome> = ({ setUserName }) => {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  const handlePressButton = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === "Enter" && inputValue.trim()) {
      navigate("/chat");
    }
    setUserName(inputValue);
  };

  return (
    <div className="name-block">
      <input
        type="text"
        placeholder="Введите ваше имя"
        onKeyUp={handlePressButton}
        onChange={({ target }) => setInputValue(target.value)}
      />
    </div>
  );
};

export default Home;
