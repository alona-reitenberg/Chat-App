import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Chat from "./pages/Chat";
import Settings from "./pages/Settings";
import { useState } from "react";
import { useSelector } from "react-redux";
import { AppContext, socket } from "./context/appContext";

function App() {
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState([]);
  const [members, setMembers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [privateMemberMsg, setPrivateMemberMsg] = useState({});
  const [newMessages, setNewMessages] = useState({});
  const user = useSelector((state) => state.user);
  return (
    <div className="bg-app">
      <AppContext.Provider
        value={{
          socket,
          currentRoom,
          setCurrentRoom,
          members,
          setMembers,
          messages,
          setMessages,
          privateMemberMsg,
          setPrivateMemberMsg,
          rooms,
          setRooms,
          newMessages,
          setNewMessages,
        }}
      >
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            {/* if there in no user show him the login and singup page */}
            {!user && (
              <>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
              </>
            )}
            <Route path="/chat" element={<Chat />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </BrowserRouter>
      </AppContext.Provider>
    </div>
  );
}

export default App;
