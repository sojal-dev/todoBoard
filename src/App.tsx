import Board from "./components/board";
import "./App.css";
import Header from "./components/header";
import "bootstrap/dist/css/bootstrap.min.css";


function App() {
  return(
    <div className="app">
      <Header />
      <div className="p-4">
        <Board />
      </div>
    </div>
  )
}

export default App;