import  { atom } from 'recoil';

export const circleState = atom({
    key: 'circleState',
    default: [],
});

export const scoreState = atom({
    key: 'scoreState',
    default: 0,
});