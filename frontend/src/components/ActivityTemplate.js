import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiCalls from "../services/apiCalls";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Typography } from "@material-ui/core";
import Modal from "./Modal";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(2),

    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "300px",
    },
    "& .MuiButtonBase-root": {
      margin: theme.spacing(2),
    },
  },
}));

export default function ActivityTemplate({
  user,
  type,
  activityData,
  setActivityData,
}) {
  console.log(activityData);
  // const [activityData, setActivityData] = useState([]);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const classes = useStyles();

  // console.log(user);

  // console.log("Apicalls token: ", apiCalls.getToken());

  // useEffect(() => {
  //   navigate(`/activity/${type}`);
  // }, [navigate]);

  const handleClose = () => {
    setOpen(!open);
  };
  console.log(type);
  const determineWhichToRender = (a) => {
    if (type === "exercises") {
      return (
        <div>
          {a.name}, duration: {a.duration}, intensity: {a.intensity}, id:
          {a.id}
        </div>
      );
    } else if (type === "nutrition") {
      return (
        <div>
          {a.name}, calories: {a.calories}, quantity: {a.quantity}, id:
          {a.id}
        </div>
      );
    }
  };

  const whichPageAmIon = () => {
    return (
      <div>
        I am currently on: {window.location.href}, type is currently: {type}
      </div>
    );
  };

  // console.log(activityData, "inside activityTEmplate.js ", type);
  // console.log(user, type);
  const renderCurActivity = () => {
    if (user?.email) {
      return (
        <div>
         {/* {activityData.map((a) => (
            <div> {determineWhichToRender(a)} </div>
          ))}*/}
          <Button variant="contained" onClick={handleClose}>
            Add {type}
          </Button>
          <Modal
            style={{ border: "10px solid black", width: "20px" }}
            open={open}
            handleClose={handleClose}
            type={type}
            setActivityData={setActivityData}
          />
        </div>
      );
    }
    return <div> must be logged in </div>;
    // return <div> hi </div>;
  };

  return (
    <div>
      {whichPageAmIon()}
      {renderCurActivity()}
    </div>
  );
}
