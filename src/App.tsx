import { lazy, Suspense } from "react";
import { ErrorBoundary } from "./lessons";

// just for fun try to use named exports ...
const CoinDetailLazy = lazy(async () => {
  // if just set await Promise.reject() TS rightfuly sign that as never
  const { CoinDetail } = await import("./lessons");
  return { default: CoinDetail };
});

function App() {
  return (
    <div>
      <h1>Pokedex</h1>
      <ErrorBoundary fallback="Couldn't catch 'em all.">
        <Suspense fallback={<p>loading pokemon detail....</p>}>
          <CoinDetailLazy />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
