declare module 'definit' {
    export interface IEvent {
        name: string
        once: boolean
        run: (
            client: import('../../struct/Core').Core,
            ...args: any[]
        ) => Promise<unknown>
    }
}