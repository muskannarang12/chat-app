import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { currentUser, login, setError } = useAuth();

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  async function handleFormSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(email, password);
      navigate("/");
    } catch (e) {
      setError("Failed to login");
    }

    setLoading(false);
  }
  return (
    <div
  className="min-h-screen bg-cover bg-center flex items-center justify-end"
  style={{ backgroundImage: "url('back.avif')" }} // <-- Update path
>
  <div className="bg-gray-900 bg-opacity-70 p-10 rounded-xl w-full max-w-md mr-12">
        <h2 className="text-3xl  text-white font-bold text-center  mb-6">Login</h2>
  
        <form onSubmit={handleFormSubmit} className="space-y-5">
          <div className="relative">
            <input
              type="email"
              required
              placeholder="Email"
              className="w-full p-3 pl-10 rounded-full bg-white bg-opacity-20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className="absolute left-3 top-3.5 text-white">
              <i className="fas fa-user"></i>
            </span>
          </div>
  
          <div className="relative">
            <input
              type="password"
              required
              placeholder="Password"
              className="w-full p-3 pl-10 rounded-full bg-white bg-opacity-20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="absolute left-3 top-3.5 text-white">
              <i className="fas fa-lock"></i>
            </span>
          </div>
  
          <div className="flex items-center   text-white justify-between text-sm">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="form-checkbox text-blue-500" />
              <span>Remember me</span>
            </label>
            <Link to="/forgot-password" className="hover:underline">
              Forgot password?
            </Link>
          </div>
  
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-blue-700 font-semibold py-2 rounded-full hover:bg-blue-100 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
  
          <div className="text-center text-sm mt-4  text-white">
            Don't have an account?{" "}
            <Link to="/register" className="underline hover:text-blue-300 ">
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
  
}
