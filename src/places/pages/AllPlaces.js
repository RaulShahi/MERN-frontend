import React, { useEffect, useState } from "react";
import PlaceList from "../components/PlaceList";
import { useHttp } from "../../shared/hooks/http-hook";
import { getAllPlaces } from "../../services/places";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

function AllPlaces() {
  const [places, setPlaces] = useState([]);
  const { isLoading, sendRequest: getPlaces } = useHttp();
  useEffect(() => {
    const fetchAllPlaces = async () => {
      const response = await getPlaces({ fn: getAllPlaces });
      setPlaces(response?.data?.places);
    };

    fetchAllPlaces();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="center">
          <LoadingSpinner />
        </div>
      ) : (
        <PlaceList items={places} />
      )}
    </>
  );
}

export default AllPlaces;
