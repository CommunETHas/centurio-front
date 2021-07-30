interface ImportMeta {
  env: {
    VITE_API_URL: string;
    SIGN_PASSPHRASE: string;
  };
}

declare global {
  interface Window {
    ethereum: any;
  }
}
