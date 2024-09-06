import React, { useState } from "react";
import { message } from "antd";
import { useAuth } from "../Contexts/AuthContexts";

const useSignup = () => {
  const { login } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  const registerUser = async (values) => {
    if (values.password !== values.passwordConfirm) {
      return setError("Password do not match");
    }

    try {
      setError(null);
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await res.json();
      
      if (res.status === 201) {
        message.success("User registered successfully");
        login(data.token, data);
      } else if (res.status === 400) {
        setError(data.message);
      } else {
        message.error("Registration failed!");
      }
    } catch (error) {
      message.error(error);
    } finally {
      setLoading(false);
    }
  };
  return { loading, error, registerUser };
};

export default useSignup;