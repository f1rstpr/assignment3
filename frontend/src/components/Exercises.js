import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiCalls from "../services/apiCalls";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Typography } from "@material-ui/core";
import Modal from "./Modal";
import Gallery from "./Gallery";
import Login from "./Login";
import AuthenticatedView from "./AuthenticatedView";

export default function Exercises({
  user,
  setUser,
  type,
  exercises,
  setExercises,
  handleClose,
  open,
  errors,
  setErrors,
}) {
  const [title, setTitle] = useState("Exercises");
  const [desc, setDesc] = useState(
    "Easily keep track of your physical activity here."
  );
  console.log(exercises)
  useEffect(() => {
    const fetchExercises = async () => {
      const { data, error } = await apiCalls.getCurActivity("exercises");
      if (data) {
        console.log(data);
        setExercises(data.activity);
      }
      if (error) {
        console.log(error);
      }
    };
    fetchExercises();
  }, [user]);

  const renderExercises = () => {
    if (user?.email) {
      return (
        <Gallery
          title={title}
          desc={desc}
          data={exercises}
          setData={setExercises}
          handleClose={handleClose}
          open={open}
          setErrors={setErrors}
          errors={errors}
          curPath={
            window.location.href.split("/")[
              window.location.href.split("/").length - 1
            ]
          }
        />
      );
    }

    return (
      <>
        <AuthenticatedView />
        <Login user={user} setUser={setUser} />{" "}
      </>
    );
  };

  return <div> {renderExercises()} </div>;
}
