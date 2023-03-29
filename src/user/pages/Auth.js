import React, { useContext, useState } from "react";
import Input from "../../shared/components/FormElements/Input";
import Card from "../../shared/components/UIElements/Card";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import "./Auth.css";
import Button from "../../shared/components/FormElements/Button";
import { AuthContext } from "../../shared/context/auth-context";
import { loginUser, registerUser } from "../../services/users";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { useHttp } from "../../shared/hooks/http-hook";

function Auth() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);

  const { login } = useContext(AuthContext);

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const {
    isLoading: signupLoading,
    error: signUpError,
    clearError: setSignupError,
    data: registerData,
  } = useHttp(() =>
    registerUser({
      email: formState.email.value,
      name: formState.name.value,
      password: formState.password.value,
    })
  );

  const {
    isLoading: logInLoading,
    error: logInError,
    clearError: setLoginError,
    data: loginData,
  } = useHttp(() =>
    registerUser({
      email: formState.email.value,
      password: formState.password.value,
    })
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        { ...formState.inputs, name: undefined },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        { ...formState.inputs, name: { value: "", isValid: false } },
        false
      );
    }
    setIsLoginMode((prev) => !prev);
  };

  const authSubmitHandler = async (e) => {
    e.preventDefault();
    const { email, name, password } = formState.inputs;
    if (!isLoginMode) {
      try {
        setIsLoading(true);
        const response = await registerUser({
          email: email.value,
          name: name.value,
          password: password.value,
        });
        setIsLoading(false);
        if (!response?.status) {
          throw new Error(response?.data?.message);
        }

        login();
      } catch (err) {
        setIsLoading(false);
        console.log(err);
        setError(err.message || "Failed to sign up.Please try again later.");
      }
    } else {
      try {
        setIsLoading(true);
        const response = await loginUser({
          email: email.value,
          password: password.value,
        });
        if (!response.status) {
          throw new Error(response?.data?.message);
        }
        setIsLoading(false);
        login();
      } catch (err) {
        setIsLoading(false);
        setError(err.message || "Failed to sign in. Please try again later.");
      }
    }
  };
  return (
    <>
      <ErrorModal error={error} onClear={() => setError(undefined)} />
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>Login Required</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <Input
              element="input"
              id="name"
              type="text"
              label="Your Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a name."
              onInput={inputHandler}
            />
          )}
          <Input
            element="input"
            id="email"
            type="text"
            label="E-mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email."
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="password"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid password(at least 5 characters)"
            onInput={inputHandler}
          />
          <Button type="submit" disabled={!formState.isValid}>
            {isLoginMode ? "LOGIN" : "SIGNUP"}
          </Button>
        </form>
        <Button inverse onClick={switchModeHandler}>
          SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}
        </Button>
      </Card>
    </>
  );
}

export default Auth;
