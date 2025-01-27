import logo from "/assets/siniLoker2.png";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/useGlobalContext";

const CREDENTIALS = { username: "admin", password: "12345678" };

const Login = () => {
  const navigate = useNavigate();
  const { auth } = useContext(useGlobalContext);
  const { setAuthenticated, authenticated, user, setUser } = auth;

  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  const [passwordLength, setPasswordLength] = useState(false);
  const [error, setError] = useState(false);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setError(false);
    setInput({
      ...input,
      [name]: value,
    });

    if (name === "password" && value.length < 8) {
      setPasswordLength(true);
    } else if (name === "password" && value.length >= 8) {
      setPasswordLength(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (
      input.username === CREDENTIALS.username &&
      input.password === CREDENTIALS.password
    ) {
      setAuthenticated(true);
      // setUser(input.username);
      localStorage.setItem(
        "auth",
        JSON.stringify({
          fullName: input.username,
          username: input.username,
          password: input.password,
          image_url:
            "https://media.istockphoto.com/id/483627817/photo/showing-off-his-pearly-whites.jpg?s=612x612&w=0&k=20&c=gk6aVVGp52YFx1ZzPVQplGc7JL5zkrfxQTuLjIn2RU8=",
        })
      );
      navigate("/dashboard");
      setInput({
        username: "",
        password: "",
      });
    } else {
      setInput({
        username: "",
        password: "",
      });
      setPasswordLength(false);
      setError(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-8 bg-gray-100 min-h-screen">
      <div className="mb-8">
        <img src={logo} alt="Workify logo" className="inline-block w-20" />
        <span className="text-2xl font-semibold text-gray-800 ml-2">
          Lokerin
        </span>
      </div>
      <div className="bg-white p-8 rounded-lg shadow-lg w-[80%] md:w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6">Login Akun</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Username</label>
            <input
              type="text"
              className="w-full p-3 border rounded-lg bg-blue-100"
              placeholder="username"
              name="username"
              value={input.username}
              onChange={handleInput}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              className="w-full p-3 border rounded-lg bg-blue-100"
              placeholder="********"
              name="password"
              value={input.password}
              onChange={handleInput}
              min={8}
            />
          </div>
          {passwordLength && (
            <p className="text-red-600 -mt-2 mb-2">Minimum 8 Karakter</p>
          )}
          {error && (
            <p className="text-red-600 -mt-2 mb-2">
              Please enter a correct username and password
            </p>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-800 cursor-pointer"
          >
            Masuk Sekarang
          </button>
        </form>
      </div>
    </div>
  );
};
export default Login;
