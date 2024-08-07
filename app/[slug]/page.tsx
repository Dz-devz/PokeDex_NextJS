import PokemonImage from "@/components/pokemon-image";
import { ProgressDemo } from "@/components/progress-bar";
import { getPokemon } from "@/lib/pokemonlistApi";
import { notFound } from "next/navigation";

interface StatsObjectProps {
  stat: { name: string };
  base_stat: number;
}

export default async function PokemonPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  const pokemonObject = await getPokemon(slug);

  if (!pokemonObject) {
    notFound();
  }

  return (
    <>
      <h1 className="text-4xl text-bold pt-4">
        {slug.charAt(0).toUpperCase() + slug.slice(1)}
      </h1>
      <div className="m-4 relative w-80 h-80">
        <PokemonImage
          image={pokemonObject.sprites.other["official-artwork"].front_default}
          name={slug}
        />
      </div>
      <h3 className="text-2xl text-bold mb-5">
        Weight: {pokemonObject.weight}
      </h3>
      <div className="flex-col">
        {pokemonObject.stats.map((statsObject: StatsObjectProps) => {
          const statName = statsObject.stat.name;
          const statValue = statsObject.base_stat;
          const statNameUpperCase =
            statName.charAt(0).toUpperCase() + statName.slice(1);
          return (
            <div
              className="flex items-stretch w-[500px]"
              key={statNameUpperCase}
            >
              <h3 className="p-3 w-2/4 text-[20px] text-bold">
                {statNameUpperCase}: {statValue}
              </h3>
              <ProgressDemo value={statValue} />
            </div>
          );
        })}
      </div>
    </>
  );
}
