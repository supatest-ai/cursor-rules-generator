/// <reference types="vite/client" />

// Declare module for .mdc files imported with ?raw
declare module '*.mdc?raw' {
    const content: string;
    export default content;
} 