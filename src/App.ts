import Selectbox, { Option } from './components/Selectbox/Selectbox';
import { TELECOMS } from './constants/telecoms';

export default () => {
  const app = document.createElement('main');
  const selectbox = Selectbox(
    TELECOMS.map<Option>(({ description, code }) => ({
      name: description,
      value: code,
    })),
  );
  app.appendChild(selectbox);
  return app;
};
