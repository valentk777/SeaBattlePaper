import {UserAccount} from '../entities/user';
import {useAuth} from './useAuth';

export const useCurrentUser = (): UserAccount => {
  const {state} = useAuth();

  if (state.user === null) {
    return {} as UserAccount;
  } else {
    return state.user;
  }
};
