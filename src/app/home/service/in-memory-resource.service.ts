import { InMemoryDbService } from 'angular-in-memory-web-api';
import { ResourceList } from '../data/resource'
export class InMemoryResourceService implements InMemoryDbService {
  createDb() {
    return {ResourceList};
  }
}