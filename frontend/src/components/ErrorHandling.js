import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";

import {
    Avatar,
    Button,
    Link as UiLink,
    CssBaseline,
    TextField,
    FormControlLabel,
    Checkbox,
    Grid,
    Box,
    Typography,
    Container,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        "& > * + *": {
            marginTop: theme.spacing(2),
        },
    },
}));

export default function ErrorHandling({ message }) {
    const classes = useStyles();

    const whatToReturn = () => {
        if (message) {
            return (
                <Container component="main" maxWidth="xs">
                    <Alert severity="error">{message}</Alert>
                </Container>
            );
        }
        return <> </>;
    };

    return <>{whatToReturn()}</>;
}
