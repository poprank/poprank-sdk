<p align="center">
  <a href="https://discord.gg/9R5RzdUbXb">
    <img src="https://poprank.io/android-chrome-192x192.png" alt="PopRank" />
  </a>
</p>
<p align="center">
  <a href="https://discord.gg/9R5RzdUbXb">
    <img src="https://img.shields.io/badge/-Join%20PopRank%20Discord-%235865F2?logo=discord&logoColor=white" alt="Join PopRank Discord">
  </a>
  &nbsp;
  <a href="https://twitter.com/_poprank">
    <img src="https://img.shields.io/badge/-Follow%20PopRank%20Twitter-%2300acee?logo=twitter&logoColor=white"
      alt="Follow PopRank Twitter">
  </a>
</p>

# PopRank SDK: API Client & Types

The PopRank SDK contains the building blocks needed to interact with and build on top of PopRank. In fact, the PopRank team uses the SDK to power https://poprank.io, [`@poprank/rankings`](https://github.com/poprank/rankings), [`@poprank/opensea`](https://github.com/poprank/opensea), and various other offerings.

The SDK is comprised of two main sections: [`client`](https://github.com/poprank/sdk/blob/main/src/client.ts) and [`types`](https://github.com/poprank/sdk/tree/main/src/types).

## Getting Started

### Installation

Install the NPM package.

```
yarn add @poprank/sdk
```

### Client Setup

Import, configure, and instantiate the PopRank API client.
```
import { ClientConfig, PopRankClient } from '@poprank/sdk';

const config: ClientConfig = { // optional
    timeout: 10_000
};

const client = new PopRankClient(config);
```

_Note:_ `ClientConfig` is a pass-through import of `axios`'s `AxiosRequestConfig`. View all config options [here](https://axios-http.com/docs/req_config).

### Make API Calls

Make calls to the PopRank API with the newly instantiated PopRank API client.

```
const nft = await client.getNFT('thewickedcraniums', 420);
```

All client methods can be found [here](https://github.com/poprank/sdk/blob/main/src/client.ts). For in-depth documentation on all the PopRank endpoints, see our [API documentation](https://poprank.readme.io/reference/api-overview).

### Reference PopRank Models

You can also directly reference PopRank types/models, like so.

```
const nft: Nft = {
    collection: 'thewickedcraniums',
    id: '420',
    rating: 1196,
    ...
}
```

All types are found within the [types directory](https://github.com/poprank/sdk/tree/main/src/types).

## Support


As always, don't hesitate to reach out to the PopRank team on [Twitter](https://twitter.com/_poprank) or [Discord](https://discord.gg/9R5RzdUbXb) if you have any questions!
