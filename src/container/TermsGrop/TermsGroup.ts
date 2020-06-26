import styles from './TermsGroup.module.scss';
import { TERMS } from '../../constants/terms';
import Checkbox from '../../components/Checkbox/Checkbox';
import { isAllCheckedMap } from '../../util/common';

export default function (): HTMLElement {
  const fragment = new DocumentFragment();
  const memberStatus = new Map<string, boolean>();

  const members = TERMS.map<HTMLDivElement>(({ termsId, title }) => {
    memberStatus.set(termsId, false);
    const CheckboxComponent = Checkbox({
      label: title,
      id: termsId,
      onChange: ({ target }) => {
        const { checked, id } = target as HTMLInputElement;
        memberStatus.set(id, checked);
        const isAllChecked = isAllCheckedMap(memberStatus);
        const inputElement = checkAllElement.querySelector('input');
        if (inputElement) inputElement.checked = isAllChecked;
      },
    });
    fragment.appendChild(CheckboxComponent);
    return CheckboxComponent;
  });

  const memberSectionElement = document.createElement('section');
  memberSectionElement.appendChild(fragment);
  memberSectionElement.className = styles.members;

  const wrapperElement = document.createElement('acticle');
  wrapperElement.className = styles.wrapper;
  wrapperElement.appendChild(
    new DocumentFragment().appendChild(memberSectionElement),
  );
  const checkAllElement = Checkbox({
    label: '전체 동의하기',
    onChange: ({ target }) => {
      const { checked } = target as HTMLInputElement;
      members.forEach(member => {
        const checkboxElement = member.querySelector('input');
        if (checkboxElement) checkboxElement.checked = checked;
      });
    },
  });
  checkAllElement.classList.add(styles['check-all']);
  wrapperElement.appendChild(
    new DocumentFragment().appendChild(checkAllElement),
  );

  return wrapperElement;
}
