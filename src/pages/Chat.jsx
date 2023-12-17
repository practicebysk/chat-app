import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { allUsersRoute, host } from "../utils/APIRoutes";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import Chatcontainer from "../components/Chatcontainer";
import { io } from "socket.io-client";

function Chat() {
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);

  const navigate = useNavigate();
  const socket = useRef();

  useEffect(() => {
    const fetchData = async () => {
      if (!localStorage.getItem("chat-app-user")) {
        navigate("/login");
      } else {
        const user = JSON.parse(localStorage.getItem("chat-app-user"));
        setCurrentUser(user);
        try {
          if (user && user.isAvatarImageSet) {
            const data = await axios.get(`${allUsersRoute}/${user._id}`);
            setContacts(data.data);
          } else {
            navigate("/setAvatar");
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  return (
    <Conatainer>
      <div className="container">
        <Contacts contacts={contacts} changeChat={handleChatChange} />
        {currentChat === undefined ? (
          <Welcome currentUser={currentUser} />
        ) : (
          <Chatcontainer
            currentChat={currentChat}
            currentUser={currentUser}
            socket={socket}
          />
        )}
      </div>
    </Conatainer>
  );
}
const Conatainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Chat;
