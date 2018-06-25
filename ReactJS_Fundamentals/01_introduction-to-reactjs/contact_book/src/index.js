import ReactDOM from 'react-dom';
import './style/index.css';
import App from './App';

const rerender = ReactDOM.render
ReactDOM.render(App(), document.getElementById('root'));

export default rerender