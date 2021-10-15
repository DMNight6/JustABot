import { Manager, PlayerEvent, PlayerEvents, PlayerEventType, VoiceEvent } from 'erela.js'
import { ErelaEvents } from './EventKeys/ErelaKey';

interface RunArgs {
    (
        client: import('../struct/Core').Core,
        manager: import('erela.js').Manager,
        ...args: any[]
    ): Promise<any>
}

export interface IManagerEvent {
    name: keyof ErelaEvents
    run: RunArgs
}