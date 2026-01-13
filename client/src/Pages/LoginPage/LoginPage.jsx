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
    <div className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 z-50 w-12 h-12 rounded-full
                   bg-white/10 backdrop-blur-md border border-white/20
                   flex items-center justify-center
                   hover:scale-110 hover:bg-white/20 transition"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="text-white" />
      </button>

      {/* Login Card */}
      <div
        className="relative z-10 w-full max-w-md px-10 py-12 rounded-2xl
                      bg-white/10 backdrop-blur-2xl border border-white/20
                      shadow-2xl space-y-6"
      >
        {/* Heading */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-semibold text-white">Welcome Back</h1>
          <p className="text-sm text-white/70">
            Log in to continue your journey
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <div>
            <label className="block text-sm text-white/70 mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl
                         bg-white/10 text-white placeholder-white/50
                         border border-white/20
                         focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-white/70 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl
                         bg-white/10 text-white placeholder-white/50
                         border border-white/20
                         focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full py-3 rounded-full font-semibold tracking-wide
                       bg-cyan-500/90 text-slate-900
                       hover:bg-cyan-400
                       disabled:opacity-60 disabled:cursor-not-allowed
                       transition"
          >
            {status === "loading" ? "Logging in..." : "Login →"}
          </button>
        </form>

        {/* Register */}
        <div className="text-center text-sm text-white/70">
          New here?
          <button
            onClick={() => navigate("/register")}
            className="ml-2 text-cyan-400 hover:text-cyan-300 transition"
          >
            Create account
          </button>
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-400 text-sm text-center">
            {error.message || error}
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
