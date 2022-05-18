import { helper } from '@ember/component/helper';
import dateFnsFormat from 'date-fns/format';
import { nlBE } from 'date-fns/locale';

export default helper(function formatDate([date, format] /*, named*/) {
  return dateFnsFormat(date, format, { locale: nlBE });
});
