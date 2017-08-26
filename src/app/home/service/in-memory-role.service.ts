import { InMemoryDbService } from 'angular-in-memory-web-api';
import { RoleList } from '../data/role'
export class InMemoryRoleService implements InMemoryDbService {
  createDb() {
    return {RoleList};
  }
}