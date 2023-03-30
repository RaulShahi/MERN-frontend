import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import "./PlaceForm.css";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttp } from "../../shared/hooks/http-hook";
import { getPlaceById, updatePlaceById } from "../../services/places";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { AuthContext } from "../../shared/context/auth-context";
import Card from "../../shared/components/UIElements/Card";

function UpdatePlace() {
  const { placeId } = useParams();
  const [loadedPlace, setLoadedPlace] = useState([]);
  const history = useHistory();
  const { isLoading, error, clearError, sendRequest } = useHttp();
  const { userId } = useContext(AuthContext);
  const [formState, inputHandler, setFormData] = useForm(
    {
      title: { value: "", isValid: false },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    const fetchPlace = async () => {
      const response = await sendRequest({
        fn: getPlaceById,
        params: { pid: placeId },
      });
      const { title, description } = response?.data?.place;
      setLoadedPlace(response?.data?.place);
      setFormData(
        {
          title: { value: title, isValid: true },
          description: {
            value: description,
            isValid: true,
          },
        },
        true
      );
    };
    fetchPlace();
  }, [sendRequest, placeId, setFormData]);

  const placeUpdateSubmitHandler = async (e) => {
    e.preventDefault();
    const { title, description } = formState.inputs;
    await sendRequest({
      fn: updatePlaceById,
      payload: { title: title.value, description: description.value },
      params: { pid: placeId },
    });
    history.replace(`/${userId}/places`);
  };

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!loadedPlace) {
    <Card>
      <h2>Could not find place!</h2>
    </Card>;
  }

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
        <Input
          id="title"
          element="input"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please add a valid title."
          onInput={inputHandler}
          initialValue={formState.inputs.title.value}
          initialValidity={formState.inputs.title.isValid}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description (min. 5 characters)."
          onInput={inputHandler}
          initialValue={formState.inputs.description.value}
          initialValidity={formState.inputs.description.isValid}
        />
        <Button type="submit" disabled={!formState.isValid}>
          UPDATE PLACE
        </Button>
      </form>
    </>
  );
}

export default UpdatePlace;
