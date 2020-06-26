declare module '*.scss' {
  export const content: { [className: string]: string };
  export default styles;
}

declare interface CustomFormInput {
  defaultValue?: string;
  label?: string;
  id?: string;
  name?: string;
  onChange?(e: Event): void;
}
