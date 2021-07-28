import '../src/index.css';
import { useState, useEffect } from 'react';

const url = 'https://pokeres.bastionbot.org/images/pokemon';

export default function App() {
  const poke = [
    { id: 1, name: 'balbasaur' },
    { id: 8, name: 'wartotle' },
    { id: 9, name: 'blastoise' },
    { id: 6, name: 'charizard' },
    { id: 17, name: 'pidgeot' },
    { id: 3, name: 'charmander' },
    { id: 15, name: 'rattata' },
    { id: 11, name: 'pidgey' },
  ];

  const pokemons = [...poke, ...poke];

  function shuffle(array) {
    var currentIndex = array.length,
      randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  const [openCard, setOpenCard] = useState([]);
  const [round, setRound] = useState([]);
  const [shufflePokemon, setShufflePokemon] = useState([]);

  useEffect(() => {
    setShufflePokemon(shuffle(pokemons));
  }, []);

  const handleClick = (index) => {
    setOpenCard((open) => [...open, index]);
  };

  useEffect(() => {
    const firstRound =
      shufflePokemon[openCard[openCard.length < 2 ? 0 : openCard.length - 2]];
    const secondRound =
      shufflePokemon[openCard[openCard.length < 2 ? 1 : openCard.length - 1]];

    if (secondRound && firstRound.id === secondRound.id) {
      setRound([...round, firstRound]);
    }

    if (secondRound !== firstRound) {
      if (openCard.length % 2 === 0)
        setTimeout(() => setOpenCard(openCard.slice(0, -2)), 1000);
    }
  }, [openCard]);

  return (
    <div className="app">
      <div className="cards">
        {shufflePokemon.map((pokemon, index) => {
          var reverseCard = false;

          if (openCard.includes(index)) {
            reverseCard = true;
          }

          if (round.includes(pokemon.id)) {
            reverseCard = true;
          }

          return (
            <div
              className={`pokemon-card ${reverseCard ? 'reverse' : ''}`}
              key={index}
              onClick={() => handleClick(index)}
            >
              <div className="inner">
                <div className="front">
                  <img
                    src={`${url}/${pokemon.id}.png`}
                    alt="pokemon"
                    width="150"
                  />
                </div>
                <div className="back"></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
