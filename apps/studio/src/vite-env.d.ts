declare module '*?worker&url' {
  const src: string;
  export default src;
}

declare module '*?url' {
  const src: string;
  export default src;
}

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
}
