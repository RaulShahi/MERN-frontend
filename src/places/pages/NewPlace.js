import React, { useCallback, useContext, useReducer } from "react";

import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import "./PlaceForm.css";
import Button from "../../shared/components/FormElements/Button";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttp } from "../../shared/hooks/http-hook";
import { addPlace } from "../../services/places";
import { AuthContext } from "../../shared/context/auth-context";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { useHistory } from "react-router-dom";

function NewPlace() {
  const { userId } = useContext(AuthContext);
  const history = useHistory();
  const [formState, inputHandler] = useForm(
    {
      title: { value: "", isValid: false },
      description: { value: "", isValid: false },
      address: { value: "", isValid: false },
    },
    false
  );
  const { isLoading, error, clearError, sendRequest } = useHttp();

  const placeSubmitHandler = async (e) => {
    e.preventDefault();
    const { title, description, address } = formState?.inputs;
    try {
      await sendRequest({
        fn: addPlace,
        payload: {
          title: title?.value,
          description: description?.value,
          address: address?.value,
          creator: userId,
        },
      });
      //Redirect the user to a different page.
      history.replace("/");
    } catch (err) {}
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <form className="place-form" onSubmit={placeSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}

        <Input
          id="title"
          element="input"
          label="Title"
          type="text"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
          onInput={inputHandler}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description (at least 5 characters)."
          onInput={inputHandler}
        />
        <Input
          id="address"
          element="input"
          label="Address"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid address."
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          ADD PLACE
        </Button>
      </form>
    </>
  );
}

export default NewPlace;
