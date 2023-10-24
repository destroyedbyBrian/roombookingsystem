import "./styles/App.css";
import { Button } from "@/components/button";
import BoxComponent from "./components/box";

function App() {
  return (
    <div>
      <Button>Click me</Button>
      <BoxComponent></BoxComponent>
    </div>
  );
}

export default App;
