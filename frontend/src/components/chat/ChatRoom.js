import { useState, useEffect, useRef } from "react";

import { getMessagesOfChatRoom, sendMessage } from "../../services/ChatService";

import Message from "./Message";
import Contact from "./Contact";
import ChatForm from "./ChatForm";

export default function ChatRoom({ currentChat, currentUser, socket }) {
  const [messages, setMessages] = useState([]);
  const [incomingMessage, setIncomingMessage] = useState(null);

  const scrollRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getMessagesOfChatRoom(currentChat._id);
      setMessages(res);
    };

    fetchData();
  }, [currentChat._id]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  useEffect(() => {
    socket.current?.on("getMessage", (data) => {
      setIncomingMessage({
        senderId: data.senderId,
        message: data.message,
      });
    });
  }, [socket]);

  useEffect(() => {
    incomingMessage && setMessages((prev) => [...prev, incomingMessage]);
  }, [incomingMessage]);

  const handleFormSubmit = async (message) => {
    const receiverId = currentChat.members.find(
      (member) => member !== currentUser.uid
    );

    socket.current.emit("sendMessage", {
      senderId: currentUser.uid,
      receiverId: receiverId,
      message: message,
    });

    const messageBody = {
      chatRoomId: currentChat._id,
      sender: currentUser.uid,
      message: message,
    };
    const res = await sendMessage(messageBody);
    setMessages([...messages, res]);
  };

  return (
    <div className="lg:col-span-2 lg:block bg-cover bg-center" style={{ backgroundImage: "url('back3.jpeg')" }}>
      <div className="w-full">
        {/* Header / Contact Info */}
        <div className="p-4 backdrop-blur rounded-t-2xl bg-white/10 dark:bg-gray-800/20 border-b border-white/20">
          <Contact chatRoom={currentChat} currentUser={currentUser} />
        </div>

        {/* Messages Area */}
        <div className="relative w-full p-6 overflow-y-auto h-[30rem] backdrop-blur-lg bg-white/10 dark:bg-gray-800/20 border-b border-white/20">
          <ul className="space-y-3">
            {messages.map((message, index) => (
              <div key={index} ref={scrollRef}>
                <Message message={message} self={currentUser.uid} />
              </div>
            ))}
          </ul>
        </div>

        {/* Chat Input */}
        <ChatForm handleFormSubmit={handleFormSubmit} />
      </div>
    </div>
  );
}
