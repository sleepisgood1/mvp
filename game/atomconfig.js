import  { atom } from 'recoil';

export const circlesState = atom({
    key: 'circlesState',
    default: [],
});

export const scoreState = atom({
    key: 'scoreState',
    default: 0,
});

export const controlOptions = atom({
    key: 'controlOptions',
    default: {
        isRunning: false
    },
});