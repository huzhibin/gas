import { InMemoryDbService } from 'angular-in-memory-web-api';
import { DepartList } from '../data/depart'
export class InMemoryDepartService implements InMemoryDbService {
  createDb() {
    return {DepartList};
  }
}