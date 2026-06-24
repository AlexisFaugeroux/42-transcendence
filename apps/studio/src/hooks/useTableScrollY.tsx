import { useLayoutEffect, useRef, useState } from 'react';

export function useTableScrollY() {
  const ref = useRef<HTMLDivElement>(null);
  const [y, setY] = useState(0);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;

    const update = () => {
      const thead = element.querySelector<HTMLDivElement>('.ant-table-thead');
      setY(element.clientHeight - (thead?.offsetHeight ?? 0));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(element);

    return () => {
      ro.disconnect();
    };
  }, []);

  return { ref, y };
}
