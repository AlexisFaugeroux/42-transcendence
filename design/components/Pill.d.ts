export interface PillProps {
  label?: string;
  dot?: boolean;
  active?: boolean;
  color?: string;
  title?: string;
  onClick?: () => void;
}
export function Pill(props: PillProps): JSX.Element;
