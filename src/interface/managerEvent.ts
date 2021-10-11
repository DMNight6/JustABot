import { Manager, PlayerEvent, PlayerEvents, PlayerEventType, VoiceEvent } from 'erela.js'

interface RunArgs {
    (
        client: import('../struct/Core').Core,
        manager: import('erela.js').Manager,
        ...args: any[]
    ): Promise<any>
}

export interface IManagerEvent {
    name: string    
    run: RunArgs
}