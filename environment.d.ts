declare namespace NodeJS {
  export interface ProcessEnv {
    readonly NEXT_PUBLIC_WEB_STORAGE_TOKEN: string;
    readonly NEXT_PUBLIC_SECRET_TOKEN: string;
    readonly NEXT_PUBLIC_TOMTOM_API_KEY: string;
  }
}

declare module "tomtom-react-searchbox";
