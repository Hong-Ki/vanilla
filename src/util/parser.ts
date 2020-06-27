export const parsePhoneNumber = (data: string) => {
  return data.replace(new RegExp(/(\d{3})(\d{3,4})(\d*)/, 'gi'), '$1 $2 $3');
};

export const parseRegisterNumber = (data: string) => {
  return data.replace(new RegExp(/(\d{6})(\d*)/, 'gi'), '$1-$2');
};

export function parseEventTargetToElement<T extends HTMLElement>(
  target: EventTarget | null,
): T {
  return target as T;
}
