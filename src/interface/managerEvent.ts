interface RunArgs {
    (
        client: import('../struct/Core').Core,
        manager: import('erela.js').Manager,
        ...args: any[]
    ): Promise<any>
};

export interface IManagerEvent {
    name: keyof import('./EventKeys/ErelaKey').ErelaEvents;
    run: RunArgs;
};