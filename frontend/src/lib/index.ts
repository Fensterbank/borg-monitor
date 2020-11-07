export const isClient = () => typeof window !== 'undefined';

export const isServerSide = () => !isClient();
