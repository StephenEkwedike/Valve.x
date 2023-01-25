import { Box, Paper } from "@mui/material";
import { Container } from "@mui/system";
import CodeEditor from '@uiw/react-textarea-code-editor';

import Header from "../Components/Header";

function FeesPage() {
  const feesInfo = `{
    "Fees": {
      "Mainnet": {
        "Token": "0.59%",
        "NFT": "0.002 eth"
      },
      "BSC": {
        "Token": "0.59%",
        "NFT": "0.02 bnb"
      },
      "Polygon": {
        "Token": "0.59%",
        "NFT": "2 matic"
      },
      "Avalanche": {
        "Token": "0.59%",
        "NFT": "0.2 avax"
      },
      "Fantom": {
        "Token": "0.59%",
        "NFT": "20 ftm"
      },
      "Optimism": {
        "Token": "0.59%",
        "NFT": "2 op"
      },
      "BSC testnet": {
        "Token": "0.59%",
        "NFT": "0.02 tbnb"
      }
    }
  }`;


  return(
    <>
      <Header />
      <Container maxWidth="sm">
        <CodeEditor
          value={feesInfo}
          language="json"
          readOnly
          padding={15}
          style={{
            fontSize: 16,
            borderRadius: 10,
            backgroundColor: "#1A1924",
            fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
          }}
        />
      </Container>
    </>
  )
}

export default FeesPage;