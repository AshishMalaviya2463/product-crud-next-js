import { useSelector } from "react-redux";
import { validateEmail, validatePassword } from "../utils/validators";
import { useAppSelector } from "./useRedux";
import { ProductForm } from "@/app/dashboard/ProductForm";

export interface LoginValidationProps {
  email: string;
  password: string;
}

export interface SignupValidationProps extends LoginValidationProps {
  fullName: string;
  confirmPassword?: string;
  mobileNumber: string;
}

export const useValidation = () => {
  const { users } = useAppSelector((state) => state.auth);

  const validateLogin = ({
    email,
    password,
  }: LoginValidationProps): LoginValidationProps => {
    const errors: LoginValidationProps = {
      email: "",
      password: "",
    };

    const existingUser = users.find((user) => user.email === email);

    if (String(email).trim().length <= 0) {
      errors.email = "Please enter email.";
    } else if (!validateEmail(email)) {
      errors.email = "Invalid email.";
    } else if (!existingUser) {
      errors.email = "User does not exist.";
    }

    if (String(password).trim().length <= 0) {
      errors.password = "Please enter password.";
    } else if (existingUser?.password && existingUser?.password !== password) {
      errors.password = "Invalid password.";
    }

    return errors;
  };

  const validateSignup = ({
    email,
    password,
    fullName,
    confirmPassword = "",
    mobileNumber,
  }: SignupValidationProps): SignupValidationProps => {
    const errors: SignupValidationProps = {
      email: "",
      password: "",
      confirmPassword: "",
      fullName: "",
      mobileNumber: "",
    };

    if (String(fullName).trim().length <= 0) {
      errors.fullName = "Please enter full name.";
    }

    if (String(email).trim().length <= 0) {
      errors.email = "Please enter email.";
    } else if (!validateEmail(email)) {
      errors.email = "Invalid email.";
    } else if (users.find((user) => user.email === email)) {
      errors.email = "This email is already registered.";
    }

    if (String(password).trim().length <= 0) {
      errors.password = "Please enter password.";
    } else if (!validatePassword(password)) {
      errors.password =
        "Min 8 chars, 1 uppercase, 1 lowercase, 1 special required.";
    }

    if (String(confirmPassword).trim().length <= 0) {
      errors.confirmPassword = "Please enter confirm password.";
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "Password and Confirm pass must be match.";
    }

    if (String(mobileNumber).trim().length <= 0) {
      errors.mobileNumber = "Please enter mobile number.";
    } else if (String(mobileNumber).trim().length !== 10) {
      errors.mobileNumber = "Mobile number length must be 10.";
    }

    return errors;
  };

  const validateProductForm = ({
    brand,
    category,
    description,
    price,
    sku,
    thumbnail,
    title,
    weight,
  }: ProductForm) => {
    const errors: ProductForm = {
      title: "",
      brand: "",
      category: "",
      description: "",
      price: "",
      sku: "",
      thumbnail: "",
      weight: "",
    };

    let valid = true;
    if (String(title).trim().length <= 0) {
      valid = false;
      errors.title = "Please enter title.";
    }
    if (String(brand).trim().length <= 0) {
      valid = false;
      errors.brand = "Please enter brand.";
    }
    if (String(category).trim().length <= 0) {
      valid = false;
      errors.category = "Please enter category.";
    }
    if (String(description).trim().length <= 0) {
      valid = false;
      errors.description = "Please enter description.";
    }
    if (String(price).trim().length <= 0) {
      valid = false;
      errors.price = "Please enter price.";
    }
    if (String(sku).trim().length <= 0) {
      valid = false;
      errors.sku = "Please enter sku.";
    }
    if (String(thumbnail).trim().length <= 0) {
      valid = false;
      errors.thumbnail = "Please enter thumbnail.";
    }
    if (String(weight).trim().length <= 0) {
      valid = false;
      errors.weight = "Please enter weight.";
    }

    return { ...errors, valid };
  };

  return { validateLogin, validateSignup, validateProductForm };
};
