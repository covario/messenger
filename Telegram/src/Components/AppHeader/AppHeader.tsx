import React from 'react';
import Logo from '../../Assets/Icons/Logo';

import './_app-header.scss';
import Fullscreen from '../../Assets/Icons/FullScreen';
import FullscreenExit from '../../Assets/Icons/FullScreenExit';
import Minimize from '../../Assets/Icons/Minimize';
import Close from '../../Assets/Icons/Close';

const baseClass = 'app-header';

interface Props {
  isMaximized: boolean;
  onMaximize: () => void;
  onMinimize: () => void;
  onClose: () => void;
}

const styles: React.CSSProperties = {
  width: 15,
  height: 15,
};

export const AppHeader = ({ isMaximized, onMaximize, onMinimize, onClose }: Props): JSX.Element => (
  <div className={baseClass}>
    <div className={`${baseClass}__logo`}>
      <Logo viewBox="0 0 116 17" className={`${baseClass}__logo`} />
    </div>

    <div className={`${baseClass}__controls`}>
      <button type="button" onClick={onMinimize}>
        <Minimize style={styles} />
      </button>

      <button
        type="button"
        style={{
          display: isMaximized ? 'none' : 'inline-block',
        }}
        onClick={onMaximize}
      >
        <Fullscreen style={styles} />
      </button>

      <button
        type="button"
        style={{
          display: isMaximized ? 'inline-block' : 'none',
        }}
        onClick={onMaximize}
      >
        <FullscreenExit style={styles} />
      </button>

      <button type="button" onClick={onClose}>
        <Close style={styles} />
      </button>
    </div>
  </div>
);
