import React, { useEffect, useState } from "react";
import PlaceList from "../components/PlaceList";
import { Place } from "../../model/placeModal";
import { useParams } from "react-router-dom";
import { useHttp } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { getUserPlaces } from "../../services/places";

function UserPlaces() {
  const { userId } = useParams();
  const [places, setPlaces] = useState([]);
  const { isLoading, error, clearError, sendRequest } = useHttp();

  useEffect(() => {
    const fetchUserPlaces = async () => {
      const response = await sendRequest({
        fn: getUserPlaces,
        params: { userId },
      });
      setPlaces(response?.data?.places);
    };
    fetchUserPlaces();
  }, [sendRequest, userId]);

  const placeDeletedHandler = (deletedPlaceId) => {
    setPlaces((prevPlaces) =>
      prevPlaces.filter((place) => place.id !== deletedPlaceId)
    );
  };

  return (
    <>
      {/* <ErrorModal error={error} onClear={clearError} /> */}
      {isLoading ? (
        <div className="center">
          <LoadingSpinner />
        </div>
      ) : (
        <PlaceList items={places} onDeletePlace={placeDeletedHandler} />
      )}
    </>
  );
}

export default UserPlaces;
