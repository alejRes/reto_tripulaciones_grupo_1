import './App.css';
import {BrowserRouter} from 'react-router-dom'
import {appContext} from './context/appContext'
import Main from './components/Main/Main'
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

function App() {
  
  const value = {}
  
  return (
    <div className="App">
      <BrowserRouter>
        <appContext.Provider value={value}>
          <Header/>
          <Main/>
          <Footer/>
        </appContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
