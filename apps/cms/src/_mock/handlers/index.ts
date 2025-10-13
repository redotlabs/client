import authHandlers from './auth';
import customerHandlers from './customer';

export const handlers = [...authHandlers, ...customerHandlers];
