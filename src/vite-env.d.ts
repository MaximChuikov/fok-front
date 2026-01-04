/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_PWD: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

