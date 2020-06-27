import styles from './TermsGroup.module.scss';
import { TERMS } from '../../constants/terms';
import Checkbox from '../../components/Checkbox/Checkbox';
import { isAllTrueMap } from '../../util/common';
import { parseEventTargetToElement } from '../../util/parser';

interface Props {
  onChange?(e: Event, isChangeAll?: boolean): void;
}
export default function ({ onChange }: Props = {}): HTMLElement {
  const fragment = new DocumentFragment();
  const memberStatus = new Map<string, boolean>();

  const members = TERMS.map<HTMLDivElement>(({ termsId, title }) => {
    memberStatus.set(termsId, false);
    const CheckboxComponent = Checkbox({
      label: title,
      id: termsId,
      onChange: e => {
        const { checked, id } = parseEventTargetToElement<HTMLInputElement>(
          e.target,
        );
        memberStatus.set(id, checked);
        const isAllChecked = isAllTrueMap(memberStatus);
        const inputElement = checkAllElement.querySelector('input');
        if (inputElement) inputElement.checked = isAllChecked;
        if (onChange) onChange(e, false);
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
    onChange: e => {
      const { checked } = parseEventTargetToElement<HTMLInputElement>(e.target);
      members.forEach(member => {
        const checkboxElement = member.querySelector('input');
        if (checkboxElement) checkboxElement.checked = checked;
      });
      if (onChange) onChange(e, true);
    },
  });
  checkAllElement.classList.add(styles['check-all']);
  wrapperElement.appendChild(
    new DocumentFragment().appendChild(checkAllElement),
  );

  return wrapperElement;
}
