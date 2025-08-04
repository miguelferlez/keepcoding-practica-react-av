/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_ADVERT_MIN_PRICE: number;
  readonly VITE_ADVERT_MAX_PRICE: number;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
