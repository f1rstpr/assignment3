import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiCalls from "../services/apiCalls";
import { Button, Typography } from "@material-ui/core";
import Modal from "./Modal";
import Gallery from "./Gallery";
import Login from "./Login";
import AuthenticatedView from "./AuthenticatedView";

export default function Nutrition({
  user,
  setUser,
  type,
  nutrition,
  setNutrition,
  handleClose,
  open,
  errors,
  setErrors,
}) {
  const [title, setTitle] = useState("Nutrition");
  const [desc, setDesc] = useState(
    "A healthy diet is essential for a healthy lifestyle."
  );

  useEffect(() => {
    const fetchExercises = async () => {
      const { data, error } = await apiCalls.getCurActivity("nutrition");
      if (data) {
        console.log(data);
        setNutrition(data.activity);
      }
      if (error) {
        console.log(error);
      }
    };

    fetchExercises();
  }, [user]);

  function renderNutrition() {
    if (user?.email) {
      return (
        <Gallery
          title={title}
          desc={desc}
          data={nutrition}
          setData={setNutrition}
          handleClose={handleClose}
          open={open}
          errors={errors}
          setErrors={setErrors}
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
  }
  return <div> {renderNutrition()} </div>;
}
