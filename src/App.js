import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Byline from './components/Byline';
import Headline from './components/Headline';
import BabylonExperience from './components/BabylonExperience';

function App() {
  return (
    <div className="App">
      <Header />
      <Headline />
      <Byline text="Firm yet flexible pseudo-rigid watch band clasps with embedded rare earth magnets, ending forever the need for clasp geometry." textPosition="left" />
      <Byline text="Custom-machined screens for a near-frictionless surface with subatomic smoothness." textPosition="right" />
      <Byline text="Quantum metamaterial construction bends gravity waves for levitation in all virtual exhibitions and certain breezes." textPosition="left" />
      <BabylonExperience />
      <Footer />
    </div>
  );
}

export default App;
