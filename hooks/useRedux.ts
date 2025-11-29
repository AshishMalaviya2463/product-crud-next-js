// app/hooks.ts
import { TypedUseSelectorHook, useSelector } from "react-redux";
import type { RootState } from "../redux/store"; // Adjust the path to your store file

// Use the standard useSelector hook with the RootState type
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
