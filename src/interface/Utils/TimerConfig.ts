interface TimerCFG {
    Id: string,
    timeout: NodeJS.Timeout
};

export interface TimerConfiguration extends Array<TimerCFG>{};