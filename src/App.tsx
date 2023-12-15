import React, { useRef, useState } from "react";
import {
    Container,
    Card,
    CardContent,
    makeStyles,
    Grid,
    TextField,
    Button,
} from "@material-ui/core";
import "./App.css";
import QRCode from "qrcode";
import { QrReader } from "react-qr-reader";

function App() {
    const classes = useStyles();
    const [text, setText] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [scanResultFile, setScanResultFile] = useState("");
    const [scanResultWebCam, setScanResultWebCam] = useState("");
    const qrRef = useRef<any>(null as unknown as any);

    const generateQrCode = async () => {
        try {
            const response = await QRCode.toDataURL(text);
            setImageUrl(response);
        } catch (error) {
            console.log(error);
        }
    };

    const handleErrorFile = (error: any) => {
        console.log(error);
    };
    const handleScanFile = (result: React.SetStateAction<string>) => {
        if (result) {
            setScanResultFile(result);
        }
    };

    const onScanFile = () => {
        if (qrRef.current) qrRef.current.openImageDialog();
    };

    const handleErrorWebCam = (error: any) => {
        console.log(error);
    };

    const handleScanWebCam = (result: React.SetStateAction<string>) => {
        if (result) {
            setScanResultWebCam(result);
        }
    };

    return (
        <Container className={classes.container}>
            <Card>
                <h2 className={classes.title}>Generate Download &</h2>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                            <TextField
                                label="Enter Plate Number Here"
                                onChange={(e) => setText(e.target.value)}
                            />
                            <Button
                                className={classes.btn}
                                variant="contained"
                                color="primary"
                                onClick={() => generateQrCode()}
                            >
                                Generate
                            </Button>
                            <br />
                            <br />
                            <br />
                            {imageUrl ? (
                                <a href={imageUrl} download>
                                    <img src={imageUrl} alt="img" />
                                </a>
                            ) : null}
                        </Grid>
                        {/* <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                            <Button
                                className={classes.btn}
                                variant="contained"
                                color="secondary"
                                onClick={onScanFile}
                            >
                                Scan Qr Code
                            </Button>
                            <QrReader
                                ref={qrRef}
                                delay={300}
                                style={{ width: "100%" }}
                                onError={handleErrorFile}
                                onScan={handleScanFile}
                                legacyMode
                            />
                            <h3>Scanned Code: {scanResultFile}</h3>
                        </Grid> */}
                        {/* <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                            <h3>Qr Code Scan by Web Cam</h3>
                            <QrReader
                                delay={300}
                                style={{ width: "100%" }}
                                onError={handleErrorWebCam}
                                onScan={handleScanWebCam}
                            />
                            <h3>Scanned By WebCam Code: {scanResultWebCam}</h3>
                        </Grid> */}
                    </Grid>
                </CardContent>
            </Card>
        </Container>
    );
}

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: 10,
    },
    title: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#3f51b5",
        color: "#fff",
        padding: 20,
    },
    btn: {
        marginTop: 10,
        marginBottom: 20,
    },
}));

export default App;

