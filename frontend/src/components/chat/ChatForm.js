import { useState, useEffect, useRef } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/solid";
import { EmojiHappyIcon } from "@heroicons/react/outline";
import Picker from "emoji-picker-react";

export default function ChatForm(props) {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView();
  }, [showEmojiPicker]);

  const handleEmojiClick = (event, emojiObject) => {
    setMessage((prev) => prev + emojiObject.emoji);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    props.handleFormSubmit(message);
    setMessage("");
  };

  return (
    <div
      ref={scrollRef}
      className="w-full bg-cover bg-center p-4"
      style={{ backgroundImage: "url('/back3.jpeg')" }}
    >
      {showEmojiPicker && (
        <div className="mb-2 max-w-xs rounded-xl overflow-hidden shadow-lg backdrop-blur bg-white/20 p-2">
          <Picker onEmojiClick={handleEmojiClick} />
        </div>
      )}

      <form onSubmit={handleFormSubmit}>
        <div className="flex items-center justify-between w-full p-3 bg-white/10 border border-white/30 rounded-xl backdrop-blur shadow-lg">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setShowEmojiPicker(!showEmojiPicker);
            }}
          >
            <EmojiHappyIcon
              className="h-7 w-7 text-white hover:text-yellow-400 transition"
              aria-hidden="true"
            />
          </button>

          <input
            type="text"
            placeholder="Write a message..."
            className="flex-grow mx-3 px-4 py-2 rounded-full bg-white/20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-yellow-400 border border-white/30"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            name="message"
            required
          />

          <button type="submit">
            <PaperAirplaneIcon
              className="h-6 w-6 text-white hover:text-blue-400 transition rotate-[90deg]"
              aria-hidden="true"
            />
          </button>
        </div>
      </form>
    </div>
  );
}
