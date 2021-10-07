interface RunArgs {
    (
        client: import('../struct/Core').Core,
        ...args: any[]
    ): any
}/*
    Usable argsuments in IEvent.
    run: async(<RunArgs>) => {} // Expected typings.
    // ...args is a any array type. Which means if the event is like guildCreate, ...args is there to the rescue. //
            Expected usage for IEvent if it is not <client>:
            run: async(guild) => {
                ... 
            }
    
*/

export interface IEvent {
    name: string
    once: boolean
    run: RunArgs
}