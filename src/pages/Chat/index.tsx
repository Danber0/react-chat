import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import "./Chat.scss";
const socket = io("https://danber-chat.herokuapp.com/");

type MessageState = {
  id: string;
  name: string;
  message: string;
};

interface IChat {
  userName: string;
}

const Chat: React.FC<IChat> = ({ userName }) => {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<MessageState[]>([]);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleSendMessageEnter = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.code === "Enter" && inputValue.trim() && !event.shiftKey) {
      event.preventDefault();
      socket.emit("send_message", {
        id: socket.id,
        name: userName,
        message: inputValue,
      });
      setInputValue("");
    }
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      let scrollHeight = event.target.scrollHeight;
      textAreaRef.current.style.height = `${scrollHeight}px`;
    }
  };

  const handleSendMessage = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (inputValue.trim()) {
      socket.emit("send_message", {
        id: socket.id,
        name: userName,
        message: inputValue,
      });
      setInputValue("");
    }
  };

  useEffect(() => {
    socket.on("send_message", (data) => {
      setMessages([
        ...messages,
        {
          id: data.id,
          name: data.name,
          message: data.message,
        },
      ]);
    });
  }, [messages]);

  return (
    <div className="chat-block">
      <div className="chat-title">
        <p>Простой чат</p>
      </div>
      <div className="message-block">
        <ul>
          {messages.map((el, index) => (
            <li key={index} className={el.id === socket.id ? "you" : "other"}>
              <span>{el.name}: </span>
              {el.message}
            </li>
          ))}
        </ul>
      </div>
      <div className="block-message">
        <textarea
          ref={textAreaRef}
          className="input-message"
          value={inputValue}
          onKeyDown={handleSendMessageEnter}
          onKeyUp={handleSendMessageEnter}
          onChange={({ target }) => setInputValue(target.value)}
          placeholder="Введите сообщение..."
        />
        <button className="send-message" onClick={handleSendMessage}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g fill="none" fill-rule="evenodd">
              <path d="M0 0h24v24H0z" />
              <path
                d="M5.74 15.75a39.14 39.14 0 0 0-1.3 3.91c-.55 2.37-.95 2.9 1.11 1.78 2.07-1.13 12.05-6.69 14.28-7.92 2.9-1.61 2.94-1.49-.16-3.2C17.31 9.02 7.44 3.6 5.55 2.54c-1.89-1.07-1.66-.6-1.1 1.77.17.76.61 2.08 1.3 3.94a4 4 0 0 0 3 2.54l5.76 1.11a.1.1 0 0 1 0 .2l-5.78 1.1a4 4 0 0 0-3 2.54Z"
                fill="currentColor"
              />
            </g>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Chat;
