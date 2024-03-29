import React from "react";
import { Typography, Box, Container, Grid, Button } from "@mui/material";

function SendCrypto() {
  return (
    <>
      <Container sx={{ paddingTop: "70px" }}>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            md={7}
            sx={{
              mb: 4,
              "@media (max-width:600px)": {
                textAlign: "center",
              },
            }}
          >
            <Box>
              <Typography
                variant="h3"
                sx={{
                  fontSize: "54px",
                  fontWeight: "600",
                  lineHeight: "56px",
                }}
              >
                Decentralized Web3 Contact List
              </Typography>
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: "400",
                  marginTop: "25px",
                  lineHeight: "25px",
                  paddingRight: "20px",
                }}
              >
                Give custom names to wallets & send crypto and NFT’s to wallets 
                belonging to you, friends, hires and others from a contact list, 
                enabling one-click transactions and saving time when making 
                recurring transfers<br /> <br />
                Save and edit different wallet addresses in your contacts with 
                any custom name.
              </Typography>
            </Box>
            <Button
              href={process.env.REACT_APP_APP_URL}
              sx={{
                background:
                  "linear-gradient(94.32deg, #007AFF 1.74%, #A9148B 96.61%)",
                borderRadius: "10px",
                padding: "10px 30px",
                marginTop: "50px",
                color: "#fff",
                fontSize: "16px",
                fontWeight: "400",
                height: "56px",
                textTransform: "inherit",
              }}
            >
              Go to app
            </Button>
          </Grid>
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                maxWidth: "460px",
                backgroundColor: "#1A1924",
                padding: "20px",
                borderRadius: "16px",
                margin: "0 auto",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ fontSize: "22px" }}>
                  Send to a friend or <br /> saved wallet
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <img
                    style={{ height: "30px", marginRight: "10px" }}
                    src="./img/click.png"
                    alt=""
                  />
                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: "#26A17B",
                      cursor: "pointer",
                    }}
                  >
                    Send in one click
                  </Typography>
                </Box>
              </Box>
              <input
                style={{
                  borderRadius: "20px",
                  padding: "10px 0 10px 20px",
                  outline: "none",
                  border: "1px solid #fff",
                  backgroundColor: "transparent",
                  color: "#fff",
                  marginTop: "15px",
                  width: "100%",
                  fontSize: "14px",
                  fontFamily: "Poppins",
                }}
                placeholder="Search name or wallet id"
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  marginTop: "25px",
                }}
              >
                <Typography sx={{ fontSize: "14px" }}>
                  John Doe | ETH | 0000....x000
                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: "#007AFF",
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                  >
                    Send crypto
                  </Typography>
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "#4F4E57",
                  }}
                >
                  Sent: 0.23 ETH at 1/8/23
                </Typography>
              </Box>

              <hr
                style={{
                  height: "2px",
                  color: "#A5A1A1",
                  margin: "20px 0",
                }}
              />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  marginTop: "25px",
                }}
              >
                <Typography sx={{ fontSize: "14px" }}>
                  OtherWallet2 | USDT | 0000....x000
                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: "#007AFF",
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                  >
                    Send crypto
                  </Typography>
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "#4F4E57",
                  }}
                >
                  Sent: 0.23 ETH at 1/8/23
                </Typography>
              </Box>

              <hr
                style={{
                  height: "2px",
                  color: "#A5A1A1",
                  margin: "20px 0",
                }}
              />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  marginTop: "25px",
                }}
              >
                <Typography sx={{ fontSize: "14px" }}>
                  Developer | USDC | 0000....x000
                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: "#007AFF",
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                  >
                    Send crypto
                  </Typography>
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "#4F4E57",
                  }}
                >
                  Sent: 0.23 ETH at 1/8/23
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default SendCrypto;
