export interface KnobDesign {
  radius: number;
  trackWidth: number;
  angleOffset: number;
  indicator: [number, number];
  indicatorWidth: number;
}
export interface KnobProps {
  value?: number;
  anchor?: number;
  color?: string;
  design?: KnobDesign;
  onChange?: (value: number) => void;
  onChangeEnd?: () => void;
}
export function Knob(props: KnobProps): JSX.Element;
