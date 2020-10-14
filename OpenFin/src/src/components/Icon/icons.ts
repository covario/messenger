import dangerIcon from '../../assets/danger.svg';
import alertIcon from '../../assets/alert.svg';
import caretIcon from '../../assets/caret-pointing-down.svg';
import messageIcon from '../../assets/message.svg';
import notificationIcon from '../../assets/notification.svg';
import gearIcon from '../../assets/gear.svg';
import closeIcon from '../../assets/close.svg';
import windowIcon from '../../assets/window.svg';
import searchIcon from '../../assets/search.svg';
import settingsIcon from '../../assets/settings.svg';
import exportIcon from '../../assets/export.svg';
import moreIcon from '../../assets/more.svg';

export enum Icons {
  'DANGER' = 'DANGER',
  'ALERT' = 'ALERT',
  'CARET_LIST_TOGGLE' = 'CARET_LIST_TOGGLE',
  'MESSAGE' = 'MESSAGE',
  'NOTIFICATION' = 'NOTIFICATION',
  'GEAR' = 'GEAR',
  'CLOSE' = 'CLOSE',
  'WINDOW' = 'WINDOW',
  'SEARCH' = 'SEARCH',
  'SETTINGS' = 'SETTINGS',
  'EXPORT' = 'EXPORT',
  'MORE' = 'MORE',
}

export const IconSrc: {
  [I in Icons]: React.StatelessComponent<React.SVGAttributes<SVGElement>>;
} = {
  /* eslint-disable @typescript-eslint/no-unsafe-assignment */
  [Icons.DANGER]: dangerIcon,
  [Icons.ALERT]: alertIcon,
  [Icons.CARET_LIST_TOGGLE]: caretIcon,
  [Icons.MESSAGE]: messageIcon,
  [Icons.NOTIFICATION]: notificationIcon,
  [Icons.GEAR]: gearIcon,
  [Icons.CLOSE]: closeIcon,
  [Icons.WINDOW]: windowIcon,
  [Icons.SEARCH]: searchIcon,
  [Icons.SETTINGS]: settingsIcon,
  [Icons.EXPORT]: exportIcon,
  [Icons.MORE]: moreIcon,
  /* eslint-enable @typescript-eslint/no-unsafe-assignment */
};
