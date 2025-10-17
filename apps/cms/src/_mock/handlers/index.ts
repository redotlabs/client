import signInHandlers from './sign-in';
import customerHandlers from './customer';
import resetPasswordHandlers from './reset-password';

export const handlers = [
  ...signInHandlers,
  ...customerHandlers,
  ...resetPasswordHandlers,
];
