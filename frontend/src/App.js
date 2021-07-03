import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import apiCalls from "./services/apiCalls";
import Home from "./components/Home";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Exercises from "./components/Exercises";
import ExercisesCreate from "./components/ExercisesCreate";
import Nutrition from "./components/Nutrition";
import ActivityTemplate from "./components/ActivityTemplate";
import Gallery from "./components/Gallery";
import Activity from "./components/Activity";
import Footer from "./components/Footer";

import "./App.css";

function App() {
  const [user, setUser] = useState({});
  const [type, setType] = useState("");
  // const [activityData, setActivityData] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [nutrition, setNutrition] = useState([]);
  const [open, setOpen] = useState(false);

  const [errors, setErrors] = useState({});

  const HandleLogoutUser = async () => {
    await apiCalls.logout();
    setUser({});
  };

  const handleClose = () => {
    setOpen(!open);
    setErrors({});
  };

  useEffect(() => {
    const url = window.location.href.split("/");
    setType(url[url.length - 1]);
  }, [type, window.location.href]);

  // WHen user refresh, remain logged in.
  useEffect(() => {
    const token = localStorage.getItem("lifetracker_token");
    const fetchUser = async () => {
      const { data, error } = await apiCalls.getCurUser();
      if (data) {
        setUser(data.user);
      }

      if (error) {
        console.log(`${error} ----------- App.js`);
      }
    };

    const tokenValid = async () => {
      if (token) {
        apiCalls.setToken(token);
        await fetchUser();
      }
    };
    tokenValid();
  }, []);

  // Fetch nutrition
  // Fetch activityData
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const { data, error } = await apiCalls.getCurActivity(type);
  //     if (data) {
  //       setActivityData(data.activity);
  //     }
  //     if (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchData();
  // }, [type, user]);

  // console.log(nutrition, ": Inside app.js");
  console.log(type);
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar
          user={user}
          setUser={setUser}
          HandleLogoutUser={HandleLogoutUser}
          setType={setType}
          type={type}
        />
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route
            path="/register"
            element={<Register user={user} setUser={setUser} />}
          />
          <Route
            path="/login"
            element={<Login user={user} setUser={setUser} />}
          />
          <Route
            path="/activity"
            element={<Activity user={user} setUser={setUser} />}
          />

          <Route
            path="/exercises"
            element={
              <Exercises
                user={user}
                setUser={setUser}
                type={type}
                exercises={exercises}
                setExercises={setExercises}
                handleClose={handleClose}
                errors={errors}
                setErrors={setErrors}
                open={open}
              />
            }
          />

          <Route
            path="/nutrition"
            element={
              <Nutrition
                user={user}
                setUser={setUser}
                type={type}
                nutrition={nutrition}
                setNutrition={setNutrition}
                handleClose={handleClose}
                errors={errors}
                setErrors={setErrors}
                open={open}
              />
            }
          />

          {/*<Route path="/activity/test" element={<Gallery />} />*/}
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
