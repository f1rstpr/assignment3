import React, { useState, useEffect } from "react";
import { Button, Dialog, TextField, Typography, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import apiCalls from "../services/apiCalls";
import { useNavigate } from "react-router-dom";
import ErrorHandling from "./ErrorHandling";

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

export default function Modal({
    open,
    handleClose,
    curPath,
    setData,
    errors,
    setErrors,
}) {
    const classes = useStyles();
    const navigate = useNavigate();
    const [submitted, setSubmitted] = useState(false);

    const [form, setForm] = useState({
        name: "",
        category: "",
        duration: "",
        intensity: "",
        image_url: "",
        quantity: "",
        calories: "",
    });


    const handleClick = async (e) => {
        e.preventDefault();

        if (curPath === "exercises") {
            const { data, error } = await apiCalls.saveActivity("exercises", {
                name: form.name,
                category: form.category,
                duration: form.duration,
                intensity: form.intensity,
                image_url: form.image_url,
            });

            if (data) {
                setData((prevState) => [
                    data.activity.newlyInserted[0],
                    ...prevState,
                ]);
                handleClose();
                setForm({});
            }

            if (error) {
                setErrors((prevState) => ({ ...prevState, form: error }));
            }
        } else if (curPath === "nutrition") {
            const { data, error } = await apiCalls.saveActivity("nutrition", {
                name: form.name,
                category: form.category,
                image_url: form.image_url,
                quantity: form.quantity,
                calories: form.calories,
            });

            if (data) {
                setData((prevState) => [
                    data.activity.newlyInserted[0],
                    ...prevState,
                ]);
                handleClose();
                setForm({});
            }

            if (error) {
                setErrors((prevState) => ({ ...prevState, form: error }));
            }
        }
    };

    const handleInputChange = (e) => {
        setForm((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <Box mt={2}>
                    <Typography variant="h3" align="center">
                        {curPath.toUpperCase()}
                    </Typography>
                </Box>
                <ErrorHandling message={errors?.form} />
                <form className={classes.root}>
                    <TextField
                        label="Name"
                        name="name"
                        variant="filled"
                        onChange={handleInputChange}
                    />
                    <TextField
                        label="Category"
                        name="category"
                        variant="filled"
                        onChange={handleInputChange}
                    />
                    <TextField
                        label="Image Url"
                        name="image_url"
                        variant="filled"
                        onChange={handleInputChange}
                    />

                    {curPath === "exercises" ? (
                        <>
                            <TextField
                                label="Duration"
                                name="duration"
                                variant="filled"
                                onChange={handleInputChange}
                            />
                            <TextField
                                label="Intensity (1-10)"
                                name="intensity"
                                variant="filled"
                                onChange={handleInputChange}
                            />
                        </>
                    ) : (
                        <>
                            <TextField
                                label="Quantity"
                                name="quantity"
                                variant="filled"
                                onChange={handleInputChange}
                            />
                            <TextField
                                label="Calories"
                                name="calories"
                                variant="filled"
                                onChange={handleInputChange}
                            />
                        </>
                    )}

                    <div>
                        <Button variant="contained" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            onClick={handleClick}
                        >
                            ADD
                        </Button>
                    </div>
                </form>
            </Dialog>
        </>
    );
}
