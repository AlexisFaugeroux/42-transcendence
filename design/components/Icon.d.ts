export type MsnIconLabel =
  | "msn" | "record" | "produce" | "mix" | "search" | "bell" | "plus"
  | "arrowR" | "arrowL" | "play" | "heart" | "chat" | "folder" | "home"
  | "user" | "users" | "list" | "grid" | "settings" | "triangle"
  | "download" | "music" | "waveform";
export interface IconProps {
  name: MsnIconLabel;
  size?: string;
  color?: string;
  title?: string;
  style?: object;
}
export function Icon(props: IconProps): JSX.Element | null;
