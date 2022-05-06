import { lazy, Suspense } from "react";
import { ErrorBoundary } from "./lessons";

// just for fun try to use named exports ...
const PokemonDetailLazy = lazy(async () => {
  try {
    // if just set await Promise.reject() TS rightfuly sign that as never
    const { PokemonDetail } = await (Math.random() > 0.2
      ? Promise.reject()
      : import("./lessons"));
    return { default: PokemonDetail };
  } catch (error) {
    console.error(error);
    throw new Error("Couldn't load Pokemon detail");
  }
});

function App() {
  return (
    <div>
      <h1>Pokedex</h1>
      <ErrorBoundary fallback="Couldn't catch 'em all.">
        <Suspense fallback={<p>loading pokemon detail....</p>}>
          <PokemonDetailLazy />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
