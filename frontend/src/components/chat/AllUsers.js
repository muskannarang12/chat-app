import { useState, useEffect, useRef } from "react";
import { createChatRoom } from "../../services/ChatService";
import Contact from "./Contact";
import UserLayout from "../layouts/UserLayout";
import { MoreVertical } from "lucide-react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function AllUsers({
  users,
  chatRooms,
  setChatRooms,
  onlineUsersId,
  currentUser,
  changeChat,
}) {
  const [selectedChat, setSelectedChat] = useState();
  const [nonContacts, setNonContacts] = useState([]);
  const [contactIds, setContactIds] = useState([]);
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const deleteDialogRef = useRef();

  useEffect(() => {
    const Ids = chatRooms.map((chatRoom) =>
      chatRoom.members.find((member) => member !== currentUser.uid)
    );
    setContactIds(Ids);
  }, [chatRooms, currentUser.uid]);

  useEffect(() => {
    setNonContacts(
      users.filter(
        (f) => f.uid !== currentUser.uid && !contactIds.includes(f.uid)
      )
    );
  }, [contactIds, users, currentUser.uid]);

  const changeCurrentChat = (index, chat) => {
    setSelectedChat(index);
    changeChat(chat);
  };

  const handleNewChatRoom = async (user) => {
    const members = {
      senderId: currentUser.uid,
      receiverId: user.uid,
    };
    const res = await createChatRoom(members);
    setChatRooms((prev) => [...prev, res]);
    changeChat(res);
  };

  const openDeleteDialog = (index) => {
    setDeleteIndex(index);
    deleteDialogRef.current.showModal();
  };

  const confirmDelete = () => {
    if (deleteIndex !== null) {
      const updatedRooms = [...chatRooms];
      updatedRooms.splice(deleteIndex, 1);
      setChatRooms(updatedRooms);
      if (selectedChat === deleteIndex) {
        changeChat(null);
        setSelectedChat(null);
      }
    }
    deleteDialogRef.current.close();
  };

  const handleAddNickname = (index) => {
    const nickname = prompt("Enter nickname:");
    if (nickname) {
      alert("Nickname added: " + nickname);
    }
  };

  return (
    <>
      <ul
        className="overflow-auto h-[30rem] bg-cover bg-center text-white"
        style={{ backgroundImage: "url('/back3.jpeg')" }}
      >
        <h2 className="my-2 mb-2 ml-2">Chats</h2>
        <li>
          {chatRooms.map((chatRoom, index) => (
            <div
              key={index}
              className={classNames(
                index === selectedChat
                  ? "bg-white/20 dark:bg-white/10"
                  : "hover:bg-white/10 dark:hover:bg-white/5",
                "transition duration-150 ease-in-out border-b border-white/30 dark:border-white/20 px-3 py-2 text-sm rounded-md relative"
              )}
            >
              <div className="flex items-center justify-between">
                <div
                  className="cursor-pointer w-full"
                  onClick={() => changeCurrentChat(index, chatRoom)}
                >
                  <Contact
                    chatRoom={chatRoom}
                    onlineUsersId={onlineUsersId}
                    currentUser={currentUser}
                  />
                </div>
                <div
                  className="relative ml-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenMenuIndex(openMenuIndex === index ? null : index);
                  }}
                >
                  <MoreVertical className="h-4 w-4 hover:text-gray-300 cursor-pointer" />
                  {openMenuIndex === index && (
                    <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-lg z-10">
                      <button
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        onClick={() => openDeleteDialog(index)}
                      >
                        Delete Chat
                      </button>
                      <button
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        onClick={() => handleAddNickname(index)}
                      >
                        Add Nickname
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </li>

        <h2 className="my-2 mb-2 ml-2">Other Users</h2>
        <li>
          {nonContacts.map((nonContact, index) => (
            <div
              key={index}
              className="flex items-center px-3 py-2 text-sm bg-white/20 hover:bg-white/10 border-b border-white/30 dark:border-white/20 rounded-md cursor-pointer transition"
              onClick={() => handleNewChatRoom(nonContact)}
            >
              <UserLayout user={nonContact} onlineUsersId={onlineUsersId} />
            </div>
          ))}
        </li>
      </ul>

      {/* 🗑️ Delete Confirmation Dialog */}
      <dialog
        ref={deleteDialogRef}
        className="rounded-lg shadow-lg p-6 w-[90%] max-w-sm backdrop:bg-black/30"
      >
        <h3 className="text-lg font-semibold mb-4">Do you want to delete this chat?</h3>
        <div className="flex justify-end gap-4">
          <button
            onClick={() => deleteDialogRef.current.close()}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
          >
            No
          </button>
          <button
            onClick={confirmDelete}
            className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded"
          >
            Yes
          </button>
        </div>
      </dialog>
    </>
  );
}
