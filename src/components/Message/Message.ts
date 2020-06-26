import styles from './Message.module.scss';

interface Props {
  message: string;
}

export default function ({ message }: Props): HTMLParagraphElement {
  const descriptionElement = document.createElement('p');
  descriptionElement.className = styles.message;
  descriptionElement.textContent = message;

  return descriptionElement;
}
