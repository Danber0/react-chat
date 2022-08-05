import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Home.scss";

type IHome = {
  setUserName: React.Dispatch<string>;
};

const Home: React.FC<IHome> = ({ setUserName }) => {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const handlePressEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === "Enter" && inputValue.trim()) {
      navigate("/chat");
      setUserName(inputValue);
      setInputValue("");
    }
  };

  const handlePressButton = () => {
    navigate("/chat");
    setUserName(inputValue);
    setInputValue("");
  };

  return (
    <div className="name-block">
      <input
        type="text"
        maxLength={18}
        placeholder="Введите ваше имя"
        onKeyUp={handlePressEnter}
        onChange={({ target }) => setInputValue(target.value)}
      />
      <button onClick={handlePressButton}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fill="none" fillRule="evenodd">
            <path d="M0 0h24v24H0z" />
            <path
              d="M5.74 15.75a39.14 39.14 0 0 0-1.3 3.91c-.55 2.37-.95 2.9 1.11 1.78 2.07-1.13 12.05-6.69 14.28-7.92 2.9-1.61 2.94-1.49-.16-3.2C17.31 9.02 7.44 3.6 5.55 2.54c-1.89-1.07-1.66-.6-1.1 1.77.17.76.61 2.08 1.3 3.94a4 4 0 0 0 3 2.54l5.76 1.11a.1.1 0 0 1 0 .2l-5.78 1.1a4 4 0 0 0-3 2.54Z"
              fill="currentColor"
            />
          </g>
        </svg>
      </button>
    </div>
  );
};

export default Home;
