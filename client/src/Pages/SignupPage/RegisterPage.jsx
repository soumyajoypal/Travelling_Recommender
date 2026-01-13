import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";

import { clearError, registerUser } from "../../lib/slices/userSlice";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, error } = useSelector((state) => state.user);

  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  // --------------------
  // Handlers
  // --------------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearError());
    dispatch(registerUser(form));
  };

  // --------------------
  // Redirect on success
  // --------------------
  useEffect(() => {
    if (status === "succeeded") {
      navigate("/login", { replace: true });
    }
  }, [status, navigate]);

  // --------------------
  // Cleanup errors
  // --------------------
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center p-6 bg-cover"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 z-10"></div>

      <h1 className="z-20 text-5xl font-bold mb-6 text-white">Register</h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="z-20 w-full max-w-md bg-slate-900 p-10 rounded-xl shadow-xl space-y-5"
      >
        {["name", "username", "email", "password"].map((field) => (
          <div key={field}>
            <label className="block text-sm text-gray-300 mb-1 capitalize">
              {field}
            </label>
            <input
              type={
                field === "password"
                  ? "password"
                  : field === "email"
                  ? "email"
                  : "text"
              }
              name={field}
              value={form[field]}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded-md bg-slate-700 text-white
                         border border-gray-600 focus:outline-none
                         focus:ring-2 focus:ring-teal-500"
            />
          </div>
        ))}

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full py-2 rounded-2xl font-semibold tracking-widest
                     bg-teal-700 hover:bg-teal-800
                     disabled:opacity-60 disabled:cursor-not-allowed
                     transition"
        >
          {status === "loading" ? "Registering..." : "Register"}
        </button>
      </form>

      {/* Footer */}
      <div className="z-20 mt-6 w-full max-w-md text-sm text-gray-300">
        <div className="flex justify-between items-center">
          <Link to="/login" className="flex items-center gap-2 hover:underline">
            <FontAwesomeIcon icon={faArrowCircleLeft} />
            Back to Login
          </Link>

          <button
            onClick={() => navigate("/")}
            className="text-blue-400 hover:text-blue-500"
          >
            Go back
          </button>
        </div>

        {error && (
          <p className="mt-4 text-center text-red-500">
            {error.message || error}
          </p>
        )}
      </div>
    </section>
  );
};

export default RegisterPage;
