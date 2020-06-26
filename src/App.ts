import Header from './components/Header/Header';
import IndentityForm from './container/IdentityForm/IdentityForm';

export default () => {
  const app = document.createElement('main');
  const HeaderComponent = Header(
    '입력 정보',
    '본인 명의의 휴대폰 정보를 입력하세요.',
  );
  const FormCotainer = IndentityForm({
    onSubmit: data => {
      console.log(data);
    },
  });

  app.appendChild(HeaderComponent);
  app.appendChild(FormCotainer);

  return app;
};
