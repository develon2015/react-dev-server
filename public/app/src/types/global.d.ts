/// <reference types="./electron" />

declare module '*.html' {
    const value: string;
    export default value;
}

declare module 'raw-loader!*' {
    const value: string;
    export default value;
}

declare module '*.css' {
    const value: any;
    export default value;
}
