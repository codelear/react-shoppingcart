import "./App.css";
import NavBar from "./NavBar";
import Menu from "./Menu";
import Cart from "./Cart";

function App() {
  return (
    <div className="App">
      <Cart>
        <NavBar></NavBar>
        <Menu></Menu>
      </Cart>
    </div>
  );
}

export default App;
