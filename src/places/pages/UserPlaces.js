import React from "react";
import PlaceList from "../components/PlaceList";
import { Place } from "../../model/placeModal";
import { useParams } from "react-router-dom";

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

function UserPlaces() {
  const { userId } = useParams();
  return (
    <PlaceList
      items={DUMMY_PLACES?.filter((place) => place.creator === userId)}
    />
  );
}

export default UserPlaces;
