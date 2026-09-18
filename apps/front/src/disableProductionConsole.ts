if (import.meta.env.PROD) {
  const noop = () => undefined;

  console.debug = noop;
  console.error = noop;
  console.info = noop;
  console.trace = noop;
  console.warn = noop;
}
