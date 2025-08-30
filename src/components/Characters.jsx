import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCharacters } from "./charactersReducer";
import { Link } from "react-router-dom";
import FilterInput from "./filters/FilterInput";
import FilterSelect from "./filters/FilterSelect";
import LoadMore from "./LoadMore";
import logoBig from "./images/logo-big.png";

const Characters = () => {
  const dispatch = useDispatch();
  const { characters, loading, error } = useSelector(
    (state) => state.characters
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const charactersPerPage = 8;

  useEffect(() => {
    dispatch(fetchCharacters());
  }, [dispatch]);

  useEffect(() => {
    setFilteredCharacters(characters);
  }, [characters]);

  const showCharacters = () => {
    setCurrentPage(currentPage + 1);
  };

  // Вычисляем индексы для текущей страницы
  const indexOfLastCharacter = currentPage * charactersPerPage;
  let currentCharacters = filteredCharacters.slice(0, indexOfLastCharacter);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <body>
      <header className="header">
        <img src={logoBig} alt="logo" className="header__logo" />
      </header>
      <main>
        <div className="filters">
          <FilterInput
            className="filters__name-character"
            items={characters}
            onChange={setFilteredCharacters}
          />
          <FilterSelect
            options={[
              { value: "", label: "Gender" },
              { value: "Male", label: "Male" },
              { value: "Female", label: "Female" },
            ]}
            characters={characters}
            onSelect={setFilteredCharacters}
            filterProperty="gender" // This is the property of the character to filter on
          />

          <FilterSelect
            options={[
              { value: "", label: "Species" },
              { value: "Human", label: "Human" },
              { value: "Alien", label: "Alien" },
            ]}
            characters={characters}
            onSelect={setFilteredCharacters}
            filterProperty="species" // This is the property of the character to filter on
          />

          <FilterSelect
            options={[
              { value: "", label: "Status" },
              { value: "Alive", label: "Alive" },
              { value: "Dead", label: "Dead" },
            ]}
            characters={characters}
            onSelect={setFilteredCharacters}
            filterProperty="status" // This is the property of the character to filter on
          />
        </div>

        <div className="characters">
          {currentCharacters.map((character) => (
            <div className="characters__container" key={character.id}>
              <Link to={`/characters/${character.id}`}>
                <img
                  className="characters__image"
                  src={character.image}
                  alt={character.name}
                />
                <h6 className="characters__name">{character.name}</h6>
                <p className="characters__species regular">
                  {character.species}
                </p>
              </Link>
            </div>
          ))}
        </div>
        <LoadMore
          onClick={showCharacters}
          isVisible={indexOfLastCharacter < characters.length}
        />
      </main>
    </body>
  );
};

export default Characters;
