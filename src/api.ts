import type { Coin } from "./lessons";

type Status = "pending" | "error" | "success";

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
function fetchCoin(coinId: number) {
  return fetch(`https://api.coinlore.net/api/ticker/?id=${coinId}`).then(
    (res) => res.json()
  );
}

export { suspensify, fetchCoin };
