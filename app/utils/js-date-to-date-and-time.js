import { isPresent } from '@ember/utils';

export default function jsDateToDateAndTime(jsDate) {
  if (isPresent(jsDate)) {
    const year = jsDate.getFullYear();
    const month = `${jsDate.getMonth() + 1}`.padStart(2, '0');
    const date = `${jsDate.getDate()}`.padStart(2, '0');
    const hours = `${jsDate.getHours()}`.padStart(2, '0');
    const minutes = `${jsDate.getMinutes()}`.padStart(2, '0');
    return [`${year}-${month}-${date}`, `${hours}:${minutes}`];
  } else {
    return [null, null];
  }
}
