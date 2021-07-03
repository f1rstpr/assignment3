import React, { useState, useEffect } from "react";
import apiCalls from "../services/apiCalls";

import {
    AppBar,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CssBaseline,
    Grid,
    Toolbar,
    Typography,
    Link,
    Container,
    Box,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import Login from "./Login";
import AuthenticatedView from "./AuthenticatedView";

const useStyles = makeStyles((theme) => ({
    "@global": {
        ul: {
            margin: 0,
            padding: 0,
            listStyle: "none",
        },
    },
    appBar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbar: {
        flexWrap: "wrap",
    },
    toolbarTitle: {
        flexGrow: 1,
    },
    link: {
        margin: theme.spacing(1, 1.5),
    },
    heroContent: {
        padding: theme.spacing(8, 0, 6),
    },
    cardHeader: {
        backgroundColor:
            theme.palette.type === "light"
                ? theme.palette.grey[200]
                : theme.palette.grey[700],
    },
    cardPricing: {
        display: "flex",
        justifyContent: "center",
        alignItems: "baseline",
        marginBottom: theme.spacing(2),
    },
}));

const totalObj = [
    { title: "Exercises", desc: "Total Time Exercised (mins)" },
    { title: "Nutrition", desc: "Average Calories Consumed" },
    { title: "Exercises", desc: "Average Intensity" },
];

export default function Activity({ user, setUser }) {
    const [total, setTotal] = useState({
        totalExerciseMinutes: "",
        avgCalories: "",
        avgIntensity: "",
    });

    Object.keys(total).map((key, idx) => console.log(key, total[key]));

    // Activity page useEffect
    useEffect(() => {
        const template = async (the_api_call_here, data_name, data_key) => {
            console.log(total, ": inside useeffect", data_name);
            const { data, error } = await the_api_call_here;
            console.log(data);
            if (data) {
                if (data_name.includes("avg")) {
                    setTotal((prevState) => ({
                        ...prevState,
                        [data_name]: data.statistics.avg,
                    }));
                } else if (data_name.includes("total")) {
                    setTotal((prevState) => ({
                        ...prevState,
                        [data_name]: data.statistics.sum,
                    }));
                }
            }
            if (error) {
                console.log(error);
            }
        };

        const fetchTotal = async () => {
            await template(apiCalls.getAvgCalories(), "avgCalories", "avg");
            await template(apiCalls.getAvgIntensity(), "avgIntensity", "avg");
            await template(
                apiCalls.getTotalDurationEx(),
                "totalExerciseMinutes",
                "sum"
            );
        };

        fetchTotal();
    }, [user]);
    const classes = useStyles();

    console.log(total);

    const renderActivityPage = () => {
        if (user?.email) {
            return (
                <>
                    <CssBaseline />
                    {/* Hero unit */}
                    <Container
                        maxWidth="sm"
                        component="main"
                        className={classes.heroContent}
                    >
                        <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            color="white"
                            gutterBottom
                        >
                            Activity Feed
                        </Typography>

                        <Typography
                            variant="h5"
                            align="center"
                            color="textSecondary"
                            component="p"
                        >
                            A short summary of your activies are displayed here.
                        </Typography>
                    </Container>
                    {/* End hero unit */}
                    <Container maxWidth="md" component="main">
                        <Grid container spacing={5} alignItems="flex-end">
                            {/*Object.keys(total).map((key, idx) => console.log(key, total[key]));*/}
                            {Object.keys(total).map((key, idx) => (
                                // Enterprise card is full width at sm breakpoint
                                <Grid item key={key} xs={12} md={4}>
                                    <Card>
                                        <CardHeader
                                            title={totalObj[idx].title}
                                            subheader={totalObj[idx].desc}
                                            titleTypographyProps={{
                                                align: "center",
                                            }}
                                            subheaderTypographyProps={{
                                                align: "center",
                                            }}
                                            className={classes.cardHeader}
                                        />
                                        <CardContent>
                                            <div
                                                className={classes.cardPricing}
                                            >
                                                <Typography
                                                    component="h2"
                                                    variant="h3"
                                                    color="textPrimary"
                                                ></Typography>
                                                <Typography
                                                    variant="h6"
                                                    color="textSecondary"
                                                >
                                                    {Number(total[key]).toFixed(
                                                        2
                                                    )}
                                                </Typography>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </>
            );
        }
        return (
            <>
                <AuthenticatedView /> <Login user={user} setUser={setUser} />
            </>
        );
    };
    return <> {renderActivityPage()} </>;
}

// AuthenticatedView
