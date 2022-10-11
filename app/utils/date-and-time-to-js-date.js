import { isPresent } from '@ember/utils';

export default function dateAndTimeToJsDate(date, time) {
  if (isPresent(date) && isPresent(time)) {
    return new Date(Date.parse(`${date}T${time}:00`));
  } else {
    return null;
  }
}
