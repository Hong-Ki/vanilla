import App from './App';
import './styles/main.scss';

window.onload = function () {
  const el = document.getElementById('root');
  if (el) el.append(App());
};
