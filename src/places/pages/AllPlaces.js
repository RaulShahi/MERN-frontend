import React, { useEffect, useState } from "react";
import PlaceList from "../components/PlaceList";
import { Place } from "../../model/placeModal";
import { useParams } from "react-router-dom";
import { useHttp } from "../../shared/hooks/http-hook";
import { getAllPlaces } from "../../services/places";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

export const DUMMY_PLACES = [
  new Place(
    "p1",
    "Empire State Building",
    "One of the most famous sky scrapers in the world!",
    "https://lh3.googleusercontent.com/p/AF1QipNVlM5lo7fIJrmvjN4EOrTMiQjDgDyTfw7ATdV6=s680-w680-h510",
    "20 W 34th St, New York, NY 10001",
    "u1"
  ),
  new Place(
    "p2",
    "Bob State Building",
    "One of the most famous sky scrapers in the world!",
    "https://lh3.googleusercontent.com/p/AF1QipNVlM5lo7fIJrmvjN4EOrTMiQjDgDyTfw7ATdV6=s680-w680-h510",
    "20 W 34th St, New York, NY 10001",
    "u2"
  ),
];

function AllPlaces() {
  const [places, setPlaces] = useState([]);
  const { isLoading, sendRequest: getPlaces } = useHttp();
  useEffect(() => {
    const fetchAllPlaces = async () => {
      try {
        const response = await getPlaces(getAllPlaces);
        setPlaces(response?.data?.places);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllPlaces();
  }, []);

  return (
    <>
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      <PlaceList items={places} />
    </>
  );
}

export default AllPlaces;
