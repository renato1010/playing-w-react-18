// that would be lazy loaded
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
type Status = "pending" | "error" | "success";

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

function suspensify(promise: Promise<any>) {
  let status: Status = "pending";
  let result: Coin;
  let suspender = promise.then(
    (response) => {
      status = "success";
      result = response[0];
    },
    (error) => {
      status = "error";
      result = error;
    }
  );
  return {
    read() {
      // pending
      if (status === "pending") {
        throw suspender;
      }
      // rejected
      if (status === "error") {
        throw result;
      }
      // resolved
      if (status === "success") {
        return result;
      }
    },
  };
}

let coin = suspensify(
  fetch("https://api.coinlore.net/api/ticker/?id=90").then((res) => res.json())
);
function CoinDetail() {
  return <div>{coin.read()?.name}</div>;
}
export { CoinDetail };
