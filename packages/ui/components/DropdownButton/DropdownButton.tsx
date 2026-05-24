import styles from "./DropdownButton.module.scss";
import { type JSX, useEffect, useRef, useState } from "react";

interface DropdownButton<T extends string> {
  label: string;
  options: { label: string; value: T }[];
  onSelect: (value: T) => void;
}

export function DropdownButton<T extends string>({
  label,
  options,
  onSelect,
}: DropdownButton<T>): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside the dropdown
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [isOpen]);

  return (
    <div className={styles.container} ref={containerRef}>
      <button
        onClick={() => {
          setIsOpen((isOpen) => !isOpen);
        }}
      >
        {label}
      </button>

      {isOpen ? (
        <ul className={styles.menu}>
          {options.map((opt) => (
            <li key={opt.label}>
              <button
                onClick={() => {
                  setIsOpen(false);
                  onSelect(opt.value);
                }}
                className={styles.option}
              >
                {opt.label}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
