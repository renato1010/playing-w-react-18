import { useState, useTransition } from "react";
import { fetchCoin, suspensify } from "../api";

type Coin = {
  id: string;
  symbol: string;
  name: string;
  nameid: string;
  rank: number;
  price_usd: string;
  percent_change_24h: string;
  percent_change_1h: string;
  percent_change_7d: string;
  market_cap_usd: string;
  volume24: string;
  volume24_native: string;
  csupply: string;
  price_btc: string;
  tsupply: string;
  msupply: string;
};

const testCoin: Coin = {
  id: "90",
  symbol: "BTC",
  name: "Bitcoin",
  nameid: "bitcoin",
  rank: 1,
  price_usd: "35904.64",
  percent_change_24h: "-0.48",
  percent_change_1h: "-0.13",
  percent_change_7d: "-7.02",
  market_cap_usd: "683219668667.21",
  volume24: "14286254824.58",
  volume24_native: "397894.35",
  csupply: "19028727.00",
  price_btc: "1.00",
  tsupply: "19028727",
  msupply: "21000000",
};

let initialCoin = suspensify(fetchCoin(80));

function CoinDetail() {
  const [coinResource] = useState<{
    read(): Coin | undefined;
  }>(initialCoin);
  const coin = coinResource.read();
  return <div>{coin?.name}</div>;
}
export { CoinDetail, type Coin };
