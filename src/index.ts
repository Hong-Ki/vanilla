import App from './App';
import styles from './styles/main.scss';

(function () {
  console.log(styles);
  const el = document.getElementById('root');
  if (el) el.append(App());
})();
