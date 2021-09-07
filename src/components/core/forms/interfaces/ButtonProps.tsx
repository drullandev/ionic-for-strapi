import { SubmitHandler } from 'react-hook-form';
export interface ButtonProps {
  button: {
    name: string,
    type?: string,
    label?: string,
    color?: string,
    routerLink?: string,
    //onClick?: SubmitHandler
  }
}