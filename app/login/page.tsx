"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slices/authSlice";
import { useRouter } from "next/navigation";
import Input from "@/components/Input";
import PrimaryButton from "@/components/PrimaryButton";
import { useValidation } from "@/hooks/useValidation";
import { useAppSelector } from "@/hooks/useRedux";
import Link from "next/link";
import { showToast } from "@/utils/toastUtils";

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { users } = useAppSelector((state) => state.auth);
  const { validateLogin } = useValidation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleChangeInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleLogin = () => {
    const errors = validateLogin(form);

    if (errors.email || errors.password) {
      setErrors(errors);
      return;
    }

    const existingUser = users.find((user) => user.email === form.email);

    if (existingUser) {
      dispatch(login(existingUser));
      setErrors({
        email: "",
        password: "",
      });
      showToast("Login successful");
      router.push("/dashboard");
    }
  };

  return (
    <div className="max-h-[600px] max-w-5xl min-w-xl bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-md rounded-3xl flex flex-col items-center justify-center px-5 py-8">
      <h1 className="text-4xl font-bold mb-6">Login</h1>

      <Input
        name="email"
        label="Email"
        placeholder="Enter email"
        value={form.email}
        onChange={handleChangeInputs}
        error={errors.email}
      />

      <Input
        name="password"
        label="Password"
        type="password"
        placeholder="Enter password"
        value={form.password}
        onChange={handleChangeInputs}
        error={errors.password}
      />

      <PrimaryButton className="w-full mt-6" onClick={handleLogin}>
        Login
      </PrimaryButton>

      <div className="flex items-center justify-center gap-1 mt-2">
        <p className="p-0 m-0">Don't have an account?</p>{" "}
        <Link href={"/signup"} className="text-blue-800!">
          Signup
        </Link>
      </div>
    </div>
  );
};

export default Login;
