"use client";

import { useAppSelector } from "@/hooks/useRedux";
import PrimaryButton from "./PrimaryButton";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";
import { showToast } from "@/utils/toastUtils";

const Header = () => {
  const router = useRouter();
  const { loggedInUser } = useAppSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    showToast("Logout successful");
    router.push("/login");
  };

  return (
    <div className="flex items-center justify-between px-6 h-16 bg-teal-50">
      <p className="text-2xl font-bold">Welcome, {loggedInUser?.fullName}</p>
      <PrimaryButton onClick={handleLogout}>Log Out</PrimaryButton>
    </div>
  );
};

export default Header;
