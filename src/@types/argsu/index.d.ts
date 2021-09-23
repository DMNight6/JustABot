declare module 'argsu' {
    export type Options = {
        name: string;
        type: (t: unknown) => unknown;
        aliases?: string[];
    }[];
    
    export interface Result {
        _unknown: {
            _?: string;
            [key: string]: unknown;
        };
        [key: string]: unknown;
    }
    export function argsu(options: Options, argv?: string[]): Result
}