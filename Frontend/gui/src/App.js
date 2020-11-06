import './App.css';
import BaseRouter from './containers/routes';
import {BrowserRouter as Router} from 'react-router-dom';
import 'antd/dist/antd.css';

function App() {
  return (
    <div className="App">
        <Router>
            <BaseRouter/>
        </Router>
    </div>
  );
}


export default App;
