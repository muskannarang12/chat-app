import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Profile() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [avatars, setAvatars] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState();
  const [loading, setLoading] = useState(false);

  const { currentUser, updateUserProfile, setError } = useAuth();

  useEffect(() => {
    const avatarURLs = [
      "https://api.dicebear.com/9.x/avataaars/svg?seed=Nolan",
      "https://api.dicebear.com/9.x/avataaars/svg?seed=Jack",
      "https://api.dicebear.com/9.x/avataaars/svg?seed=Christopher",
      "https://api.dicebear.com/9.x/avataaars/svg?seed=Alexander",
      "https://api.dicebear.com/9.x/avataaars/svg?seed=Leo",
      "https://api.dicebear.com/9.x/avataaars/svg?seed=Valentina"
    ];
    setAvatars(avatarURLs);
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (selectedAvatar === undefined) return setError("Please select an avatar");

    try {
      setError("");
      setLoading(true);
      await updateUserProfile(currentUser, {
        displayName: username,
        photoURL: avatars[selectedAvatar],
      });
      navigate("/");
    } catch (e) {
      setError("Failed to update profile");
    }
    setLoading(false);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: "url('back3.jpeg')",
      }}
    >
      <div className="bg-white/30 dark:bg-black/30 backdrop-blur-md shadow-xl rounded-2xl px-10 py-8 max-w-md w-full">
        <h2 className="text-3xl font-semibold text-center text-white dark:text-white mb-6">
          Pick an Avatar
        </h2>
        <form onSubmit={handleFormSubmit} className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            {avatars.map((avatar, index) => (
              <img
                key={index}
                alt={`avatar-${index}`}
                src={avatar}
                className={classNames(
                  "w-20 h-20 rounded-full object-cover mx-auto cursor-pointer transition-all duration-200",
                  selectedAvatar === index
                    ? "ring-4 ring-blue-400 scale-105"
                    : "hover:ring-4 hover:ring-blue-200"
                )}
                onClick={() => setSelectedAvatar(index)}
              />
            ))}
          </div>

          <input
            type="text"
            required
            placeholder="Enter a Display Name"
            defaultValue={currentUser.displayName}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white/70 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 rounded-md focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}
