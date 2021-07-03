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

export default function AuthenticatedView() {
    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs">
            <Box m={5}>
                <Alert severity="error">
                    Must be logged in to view this page.
                </Alert>
            </Box>
        </Container>
    );
}
