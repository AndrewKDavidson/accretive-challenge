import "./App.css";
import ConnectFour from "./components/connectFour/connectFour";
import JustifyText from "./components/justifyText";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Accretive Code Challenge</h1>
      </header>
      <div className="moduleContainer">
        <h2>Part 1: Justified Text</h2>
        <JustifyText />
      </div>
      <div className="moduleContainer">
        <h2>Part 2: Connect 4</h2>
        <ConnectFour />
      </div>
    </div>
  );
}

export default App;
