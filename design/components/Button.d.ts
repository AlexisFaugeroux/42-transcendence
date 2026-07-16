export interface ButtonProps {
  children?: any;
  variant?: "framed" | "solid";
  color?: string;
  size?: "sm" | "md" | "lg";
  active?: boolean;
  style?: object;
  onClick?: (e: any) => void;
}
export function Button(props: ButtonProps): JSX.Element;
