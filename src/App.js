import './App.css';
import Characters from './components/Characters';
import { Footer } from './components/Footer';
import Navigation from './components/Navigation';
import AppRoutes from './components/routes';

function App() {
  return (
    <>
      <Navigation />
      <AppRoutes />
      <Footer/>
    </>
  );
}

export default App;

