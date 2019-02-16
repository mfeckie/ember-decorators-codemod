import Service from '@ember/service';
import { inject as service } from '@ember-decorators/service';

export default class TestService extends Service {
  @service() someService;
}
