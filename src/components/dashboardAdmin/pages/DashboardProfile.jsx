import { useState } from "react";
import { useContext } from "react";
import { useGlobalContext } from "../../../context/useGlobalContext";

export default function DashboardProfile() {
  const { auth, global } = useContext(useGlobalContext);
  const { user, userImg } = auth;
  const { setFetchStatus } = global;
  const [isEditProfile, setIsEditProfile] = useState(false);
  const [isEditPassword, setIsEditPassword] = useState(false);

  const [input, setInput] = useState({
    current_password: "",
    new_password: "",
    new_confirm_password: "",
  });
  const [inputProfile, setInputProfile] = useState({
    fullName: "",
    image_url: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const onChangeInputProfile = (e) => {
    const { name, value } = e.target;
    setInputProfile((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleEditProfile = (e) => {
    e.preventDefault();
    setIsEditProfile(!isEditProfile);
  };
  const handleUpdateProfile = (e) => {
    e.preventDefault();

    const { fullName, image_url } = inputProfile;

    const authData = JSON.parse(localStorage.getItem("auth"));

    if (authData) {
      authData.fullName = fullName || authData.fullName;
      authData.image_url = image_url || authData.image_url;

      localStorage.setItem("auth", JSON.stringify(authData));
      console.log("Auth updated:", authData);
      setInputProfile({
        fullName: "",
        image_url: "",
      });

      setIsEditProfile(false);
      setFetchStatus(true);
    } else {
      console.error("No auth data found in localStorage");
    }
  };
  const handleUpdatePassword = () => {};

  return (
    <section id="dashboardProfile" className="overflow-auto p-4">
      <div className="p-3 md:p-5 w-[90%] mx-auto border flex flex-col items-center border-gray-400 text-white shadow-md bg-slate-700 rounded-md">
        <h1 className="text-sm md:text-xl font-bold">Profil Akun</h1>
      </div>
      <div className="mt-3 p-3 md:p-5 w-[90%] mx-auto border flex flex-col items-center border-gray-400 text-slate-800 shadow-md bg-slate-100 rounded-md">
        <img
          src={userImg}
          alt={user}
          className="rounded-full w-32 h-32 md:w-40 md:h-40 object-cover shadow-xl border border-slate-400"
        />
        <div
          className={`flex flex-col items-center ${
            (isEditProfile || isEditPassword) && "hidden"
          }`}
        >
          <h1 className="text-sm md:text-xl font-bold mt-5 text-center">
            FullName: {user}
          </h1>
          {/* <h1 className="text-sm md:text-xl font-normal text-center">
            {Cookies.get("email")}
          </h1> */}
          <div className="flex gap-2">
            <button
              className="text-slate-200 bg-blue-600 rounded-full shadow-2xl text-sm md:text-base py-1 px-3 md:px-6 md:py-1 mt-2 hover:bg-blue-800 hover:text-slate-100"
              onClick={handleEditProfile}
            >
              Edit Profile
            </button>
            <button
              className="hidden text-slate-200 bg-blue-600 rounded-full shadow-2xl text-sm md:text-base py-1 px-3 md:px-6 md:py-1 mt-2 hover:bg-blue-800 hover:text-slate-100"
              //   onClick={handleEditPassword}
            >
              Ubah Password
            </button>
          </div>
        </div>

        <div className={`w-full ${isEditProfile ? "block" : "hidden"}`}>
          <form onSubmit={handleUpdateProfile}>
            <div className="flex flex-col w-[50%] mx-auto">
              <label>Profile Image Url</label>
              <input
                type="text"
                className="w-full rounded-md bg-white py-1 md:py-2 px-2"
                name="image_url"
                value={inputProfile.image_url}
                onChange={onChangeInputProfile}
              />
            </div>
            <div className="flex flex-col w-[50%] mx-auto">
              <label>Full Name</label>
              <input
                type="text"
                className="w-full rounded-md bg-white py-1 md:py-2 px-2"
                name="fullName"
                value={inputProfile.fullName}
                onChange={onChangeInputProfile}
              />
            </div>

            <button
              className="text-slate-200 bg-blue-600 rounded-full shadow-2xl text-sm md:text-base py-1 px-3 md:px-6 md:py-1 mt-2 hover:bg-blue-800 hover:text-slate-100 w-[50%] flex justify-center mx-auto"
              // onClick={handleEditProfile}
              type="submit"
            >
              Update Profil
            </button>
          </form>
        </div>

        <div className={`w-full ${isEditPassword ? "block" : "hidden"}`}>
          <form onSubmit={handleUpdatePassword}>
            <div className="flex flex-col w-[50%] mx-auto">
              <label>Password Saat ini</label>
              <input
                type="password"
                className="w-full rounded-md"
                name="current_password"
                value={input.current_password}
                onChange={handleInput}
              />
            </div>
            <div className="flex flex-col w-[50%] mx-auto">
              <label>Password baru</label>
              <input
                type="password"
                className="w-full rounded-md"
                name="new_password"
                value={input.new_password}
                onChange={handleInput}
              />
            </div>
            <div className="flex flex-col w-[50%] mx-auto">
              <label>Konfirm password baru</label>
              <input
                type="password"
                className="w-full rounded-md"
                name="new_confirm_password"
                value={input.new_confirm_password}
                onChange={handleInput}
              />
            </div>
            <button
              type="submit"
              className="text-slate-200 bg-blue-600 rounded-full shadow-2xl text-sm md:text-base py-1 px-3 md:px-6 md:py-1 mt-2 hover:bg-blue-800 hover:text-slate-100 w-[50%] flex justify-center mx-auto"
            >
              Update Password
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
