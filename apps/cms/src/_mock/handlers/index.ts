import signInHandlers from './sign-in';
import customerHandlers from './customer';

export const handlers = [...signInHandlers, ...customerHandlers];
