import styles from './Header.module.scss';
export default (title: string, description?: string) => {
  const fragment = new DocumentFragment();

  const titleElement = document.createElement('h1');
  titleElement.textContent = title;
  fragment.appendChild(titleElement);

  if (description) {
    const descriptionElemnt = document.createElement('p');
    descriptionElemnt.textContent = description;

    fragment.appendChild(descriptionElemnt);
  }
  const headerElement = document.createElement('header');
  headerElement.className = styles.header;

  headerElement.appendChild(fragment);

  return headerElement;
};
