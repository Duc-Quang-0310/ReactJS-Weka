import { Container, Nav, Navbar, NavbarBrand, NavLink } from "react-bootstrap";
import { CustomModal } from "./CustomModal";
import { useState } from "react";
import { SignIn } from "../Pages/SignIn";
import { SignUp } from "../Pages/SignUp";
import { PasswordRecover } from "../Pages/PasswordRecover";
import AxiosService from "../Service/axiosService";

export const CustomNavBar = () => {
  const currentUserEmail = localStorage.getItem("email");
  const [openModal, setOpenModal] = useState(false);
  const [actionTitle, setActionTitle] = useState(null);
  const [loginValue, setLoginValue] = useState({
    email: "",
    password: "",
  });
  const [signUpValue, setSignUpValue] = useState({
    email: "",
    password: "",
    passwordRepeat: "",
  });
  const [passwordRecoverValue, setPasswordRecoverValue] = useState({
    email: "",
    newPassword: "",
    passwordRepeat: "",
  });
  const [actionType, setActionType] = useState(null);
  const [messageValue, setMessageValue] = useState({
    message: "",
    isSuccess: false,
  });

  const handleCloseModal = () => {
    setOpenModal(false);
    setMessageValue({ message: "", isSuccess: false });
    setLoginValue({ email: "", password: "" });
    setSignUpValue({
      email: "",
      password: "",
      passwordRepeat: "",
    });
    setPasswordRecoverValue({
      email: "",
      newPassword: "",
      passwordRepeat: "",
    });
  };
  const handleSetChildren = () => {
    if (actionType === "SignIn") {
      return (
        <SignIn
          handleChange={setLoginValue}
          messageValue={messageValue}
          currentValue={loginValue}
        />
      );
    }
    if (actionType === "SignUp") {
      return (
        <SignUp
          handleChange={setSignUpValue}
          messageValue={messageValue}
          currentValue={signUpValue}
        />
      );
    }
    if (actionType === "PasswordRecover") {
      return (
        <PasswordRecover
          handleChange={setPasswordRecoverValue}
          messageValue={messageValue}
          currentValue={passwordRecoverValue}
        />
      );
    }
  };

  const handlePressNavigator = (type) => {
    setOpenModal(true);
    if (type === "SignIn") {
      setActionTitle("Sign In");
      setActionType("SignIn");
    }
    if (type === "SignUp") {
      setActionTitle("Sign Up");
      setActionType("SignUp");
    }
    if (type === "PasswordRecover") {
      setActionTitle("Password Recover");
      setActionType("PasswordRecover");
    }
  };

  const handleSubmit = async () => {
    if (actionType === "SignIn") {
      const res = await AxiosService.login(
        loginValue.email,
        loginValue.password
      );
      setMessageValue({ message: res.data, isSuccess: res.success });
      localStorage.setItem("email", res.user);

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
    if (actionType === "SignUp") {
      const res = await AxiosService.signUp(
        signUpValue.email,
        signUpValue.password
      );
      setMessageValue({ message: res.data, isSuccess: res.success });
    }
    if (actionType === "PasswordRecover") {
      const res = await AxiosService.recoverPassword(...passwordRecoverValue);
      setMessageValue({ message: res.data, isSuccess: res.success });
    }
  };

  const renderLink = () => {
    if (currentUserEmail === null) {
      return (
        <>
          <NavLink onClick={() => handlePressNavigator("SignIn")}>
            Sign In
          </NavLink>
          <NavLink onClick={() => handlePressNavigator("SignUp")}>
            Sign Up
          </NavLink>
          <NavLink onClick={() => handlePressNavigator("PasswordRecover")}>
            Recover Password
          </NavLink>
        </>
      );
    }
    return (
      <NavLink
        onClick={() => {
          localStorage.clear();
          setTimeout(() => window.location.reload(), 500);
        }}
      >
        Log out
      </NavLink>
    );
  };

  return (
    <div>
      <Navbar bg="success" variant="dark">
        <Container>
          <NavbarBrand>Team-Up</NavbarBrand>
          <Nav>{renderLink()}</Nav>
        </Container>
      </Navbar>
      <CustomModal
        modalTitle={actionTitle}
        modalShow={openModal}
        handleClose={handleCloseModal}
        children={handleSetChildren()}
        mainActionTitle={actionTitle}
        handleMainAction={() => handleSubmit()}
      />
    </div>
  );
};
