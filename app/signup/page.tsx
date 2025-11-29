"use client";
import React, { useMemo, useState } from "react";
import { useValidation } from "@/hooks/useValidation";
import { useDispatch } from "react-redux";
import { signup } from "@/redux/slices/authSlice";
import Input from "@/components/Input";
import PrimaryButton from "@/components/PrimaryButton";
import Radio from "@/components/Radio";
import { showToast } from "@/utils/toastUtils";
import { useRouter } from "next/navigation";
import { calculatePasswordStrength } from "@/utils/validators";
import Link from "next/link";

export enum Genders {
  Male = "male",
  Female = "female",
  Other = "other",
}

interface SignupForm {
  fullName: string;
  email: string;
  password: string;
  confirmPassword?: string;
  gender: Genders;
  mobileNumber: string;
}

const Signup = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { validateSignup } = useValidation();

  const [form, setForm] = useState<SignupForm>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: Genders.Male,
    mobileNumber: "",
  });
  const [errors, setErrors] = useState<Partial<SignupForm>>({});

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

  const handleSignup = () => {
    const errors = validateSignup(form);

    if (
      errors.email ||
      errors.password ||
      errors.confirmPassword ||
      errors.fullName ||
      errors.mobileNumber
    ) {
      setErrors(errors);
      return;
    }

    const copyUser = structuredClone(form);
    delete copyUser.confirmPassword;

    dispatch(signup(copyUser));
    showToast("Signup Successful.");
    setForm({
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      gender: Genders.Male,
      mobileNumber: "",
    });
    router.push("/login");
  };

  const passwordStrengthPercentage = useMemo(() => {
    const score = calculatePasswordStrength(form.password);
    return `${score}%`;
  }, [form.password]);

  return (
    <div className="max-h-[800px] max-w-5xl min-w-xl bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-md rounded-3xl flex flex-col items-center justify-center px-5 py-8">
      <h1 className="text-4xl font-bold mb-6">Signup</h1>

      <Input
        name="fullName"
        label="Full name"
        placeholder="Enter full name"
        value={form.fullName}
        onChange={handleChangeInputs}
        error={errors.fullName}
      />

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
        containerClassName="mb-1!"
      />
      <div className="bg-gray-400 rounded-full h-3 w-full overflow-hidden mb-3">
        <div
          className={`h-full bg-teal-700 transition-all duration-300`}
          style={{ width: passwordStrengthPercentage }}
        />
      </div>

      <Input
        name="confirmPassword"
        label="Confirm password"
        type="password"
        placeholder="Enter confirm password"
        value={form.confirmPassword}
        onChange={handleChangeInputs}
        error={errors.confirmPassword}
      />

      <div className="flex items-center justify-start gap-3 w-full mb-3">
        <Radio
          id="male"
          name="gender"
          value={"male"}
          label="Male"
          onChange={handleChangeInputs}
          checked={form.gender === "male"}
        />
        <Radio
          id="female"
          name="gender"
          value={"female"}
          label="female"
          onChange={handleChangeInputs}
          checked={form.gender === "female"}
        />
        <Radio
          id="other"
          name="gender"
          value={"other"}
          label="Other"
          onChange={handleChangeInputs}
          checked={form.gender === "other"}
        />
      </div>

      <Input
        name="mobileNumber"
        label="Mobile number"
        placeholder="Enter mobile number"
        value={form.mobileNumber}
        onChange={handleChangeInputs}
        error={errors.mobileNumber}
      />

      <PrimaryButton className="w-full mt-6" onClick={handleSignup}>
        Signup
      </PrimaryButton>

      <div className="flex items-center justify-center gap-1 mt-2">
        <p className="p-0 m-0">Already have an account?</p>{" "}
        <Link href={"/login"} className="text-blue-800!">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Signup;
