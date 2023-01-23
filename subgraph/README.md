# VALV.FI-Subgraph

This is a subgraph for [valv contracts](https://github.com/StephenEkwedike/Valve.x/tree/master/contracts) on [The Graph](http://thegraph.com/).

## Deploy

This is deployed as a hosted service on serveral networks such as ethereum mainnet, BSC, BSC testnet, Polygon, Fantom, Optimism and Avalanche.
You can check these on here.

- BSC testnet: [valve-subgraph](https://thegraph.com/hosted-service/subgraph/nevermind0825/valve-subgraph)
- BSC: [valv-fi-bsc](https://thegraph.com/hosted-service/subgraph/nevermind0825/valv-fi-bsc)
- Mainnet: [valv-fi-mainnet](https://thegraph.com/hosted-service/subgraph/nevermind0825/valv-fi-mainnet)
- Polygon: [valv-fi-polygon](https://thegraph.com/hosted-service/subgraph/nevermind0825/valv-fi-polygon)
- Fantom: [valv-fi-fantom](https://thegraph.com/hosted-service/subgraph/nevermind0825/valv-fi-fantom)
- Optimism: [valv-fi-optimism](https://thegraph.com/hosted-service/subgraph/nevermind0825/valv-fi-optimism)
- Avalanche: [valv-fi-avalanche](https://thegraph.com/hosted-service/subgraph/nevermind0825/valv-fi-avalanche)

## Setup

You can deploy the updated subgraph with the command.

```bash
yarn prepare-network
yarn codegen
yarn build
yarn deploy-network
```