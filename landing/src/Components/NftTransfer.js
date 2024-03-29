import React from "react";
import { Typography, Box, Container, Grid, Button } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

function NftTransfer() {
    return (
        <>
            <Container sx={{ paddingTop: "150px" }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Box
                            sx={{
                                maxWidth: "430px",
                                backgroundColor: "#1A1924",
                                padding: "20px",
                                borderRadius: "16px",
                            }}
                        >
                            <input
                                style={{
                                    borderRadius: "16px",
                                    padding: "15px 0 15px 20px",
                                    outline: "none",
                                    border: "1px solid #fff",
                                    backgroundColor: "transparent",
                                    color: "#fff",
                                    marginTop: "15px",
                                    width: "100%",
                                    height: "64px",
                                    fontSize: "14px",
                                    fontFamily: "Poppins",
                                }}
                                placeholder="Search name or wallet id"
                            />
                            <Typography
                                sx={{ fontSize: "16px", marginTop: "30px" }}
                            >
                                Blockchain: ETH
                            </Typography>
                            <input
                                style={{
                                    borderRadius: "16px",
                                    padding: "10px 0 10px 20px",
                                    outline: "none",
                                    border: "2px solid #A5A1A1",
                                    backgroundColor: "transparent",
                                    color: "#fff",
                                    marginTop: "15px",
                                    height: "48px",
                                    fontSize: "14px",
                                    fontFamily: "Poppins",

                                    width: "100%",
                                }}
                                placeholder="Enter Recipient Address"
                            />
                            <Button
                                sx={{
                                    backgroundColor: "#007AFF",
                                    width: "100%",
                                    marginTop: "20px",
                                    color: "#fff",
                                    padding: "10px",
                                    borderRadius: "20px",
                                    textTransform: "inherit",
                                    height: "48px",
                                    "&:hover": {
                                        backgroundColor: "#007AFF",
                                    },
                                }}
                            >
                                <ContentCopyIcon sx={{ marginRight: "5px" }} />{" "}
                                <Typography>Copy confirmation link</Typography>
                            </Button>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box>
                            <Typography
                                variant="h3"
                                sx={{
                                    fontSize: "40px",
                                    fontWeight: "600",
                                    lineHeight: "56px",
                                }}
                            >
                                Works with NFT Transfer
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: "16px",
                                    fontWeight: "400",
                                    marginTop: "25px",
                                    lineHeight: "25px",
                                }}
                            >
                                Securely send NFT tokens via the platform.
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}

export default NftTransfer;
