import { User } from '../model/user.model';
import { StateService } from '../state/state.service';

export function init(state: StateService): () => Promise<User> {
  return () => state.load();
}
