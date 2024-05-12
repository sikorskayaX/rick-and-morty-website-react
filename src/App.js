import './App.css';
import { Route, Routes, Link } from "react-router-dom";
import Characters from './components/Characters';
import {Locations} from './components/Locations';
import {Episodes} from './components/Episodes';

function App() {
  return (
    <>
     <nav>
        <ul>
          <li>
            <Link to="/">Characters</Link>
          </li>
          <li>
            <Link to="/locations">Locations</Link>
          </li>
          <li>
            <Link to="/episodes">Episodes</Link>
          </li>
        </ul>
      </nav>
    <Routes>
      <Route path="/" element={<Characters />} />
      <Route path="/locations" element={<Locations />} />
      <Route path="/episodes" element={<Episodes />} />
    </Routes>
    </>
  );
}

export default App;
