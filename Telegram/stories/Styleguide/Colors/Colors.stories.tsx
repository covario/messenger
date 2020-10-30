import { withKnobs } from '@storybook/addon-knobs';
import React from 'react';

import { colors } from '../../../src/Utils/colors';
import './_styleguide-colors.scss';

const baseClass = 'styleguide-colors';

export default {
  title: 'Styleguide|Colors',
  decorators: [withKnobs],
};

export const Default = (): JSX.Element => {
  return (
    <div className={baseClass}>
      {Object.entries(colors).map(([key, color]) => (
        <div className={`${baseClass}__group`} key={key}>
          <p className={`${baseClass}__title`}>{key}</p>

          <div className={`${baseClass}__colors`}>
            <div className={`${baseClass}__color`} style={{ backgroundColor: `${color.HEX}` }}>
              <p className={`${baseClass}__color-name`}>{key}</p>
              <p className={`${baseClass}__color-code`}>${key}</p>
              <p className={`${baseClass}__color-code`}>{color.HEX}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
