import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import { loginUser, clearError } from "../../lib/slices/userSlice";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath = location.state?.path || "/";

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const { error, status } = useSelector((state) => state.user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(clearError());

    const result = await dispatch(loginUser(form));

    if (loginUser.fulfilled.match(result)) {
      navigate(redirectPath, { replace: true });
    }
  };

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  return (
    <div className="min-h-screen relative bg-slate-950">
      {/* Back button */}
      <button
        onClick={() => navigate("/")}
        className="w-12 h-12 rounded-full bg-white absolute top-5 left-5 z-50
                   flex items-center justify-center
                   hover:scale-110 transition"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="text-black" />
      </button>

      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="flex flex-col w-full max-w-md bg-slate-900 p-10 rounded-xl shadow-xl space-y-5">
          <h1 className="text-2xl font-bold text-center text-white">
            Login to AquaSavvy
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div>
              <label className="block text-sm text-gray-300 mb-1">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-md bg-slate-700 text-white
                           border border-gray-600 focus:outline-none
                           focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-gray-300 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-md bg-slate-700 text-white
                           border border-gray-600 focus:outline-none
                           focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full py-2 rounded-2xl font-semibold tracking-widest
                         bg-teal-700 hover:bg-teal-800
                         disabled:opacity-60 disabled:cursor-not-allowed
                         transition"
            >
              {status === "loading" ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Register link */}
          <div className="text-center text-sm text-gray-400">
            New to AquaSavvy?
            <button
              onClick={() => navigate("/register")}
              className="ml-2 text-blue-400 hover:text-blue-500"
            >
              Create Account
            </button>
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-500 text-sm text-center">
              {error.message || error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
