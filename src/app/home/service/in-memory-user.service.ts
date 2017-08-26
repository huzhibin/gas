import { InMemoryDbService } from 'angular-in-memory-web-api';
import { UserList } from '../data/user'
export class InMemoryUserService implements InMemoryDbService {
  createDb() {
    return {UserList};
  }
}