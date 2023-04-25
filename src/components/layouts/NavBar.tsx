
interface NavBarProps {
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavBar = ({ isDarkMode, setIsDarkMode }: NavBarProps): JSX.Element => {
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container d-flex justify-content-between align-items-center">
        <a className="navbar-brand" href="/">
          <span className="trivia">Trivia</span>
          <span className="game">Game</span>
        </a>
        <button onClick={toggleDarkMode} className="btn btn-secondary">
          {isDarkMode ? "🌞" : "🌙"}
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
