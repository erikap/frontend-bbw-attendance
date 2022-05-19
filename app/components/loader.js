import Component from '@glimmer/component';
import { isNone } from '@ember/utils';

export default class LoaderComponent extends Component {
  get label() {
    return isNone(this.args.label) ? 'Loading...' : this.args.label;
  }
}
