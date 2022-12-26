# Valve Subgraph

This is a subgraph for [valve contracts](https://github.com/StephenEkwedike/Valve.x/tree/master/contracts) on [The Graph](http://thegraph.com/).

## Deploy

This is deployed as a hosted service. You can check this on [here](https://thegraph.com/hosted-service/subgraph/nevermind0825/valve-subgraph).

## Setup

You can deploy the updated subgraph with the command.

```bash
yarn prepare:network
yarn codegen
yarn build
yarn deploy
```