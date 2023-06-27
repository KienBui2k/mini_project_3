import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import InputTask from './Component/InputTask';
import About from './Component/About';

function App() {
  return (
    <BrowserRouter>
      <div className="App__container">
        <Routes>
          <Route path='/' index element={<InputTask />} />
          <Route path='about' element={<About />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
