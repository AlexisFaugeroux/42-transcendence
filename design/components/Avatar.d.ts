export interface AvatarProps { name?: string; size?: number; status?: "live" | "online" | "idle" | "offline"; ring?: boolean; }
export function Avatar(props: AvatarProps): JSX.Element;
