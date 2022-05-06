// named exports is not the intended way to export compoents
// that would be lazy loaded
function PokemonDetail() {
  return <div>Static Pokemon</div>;
}
export { PokemonDetail };
