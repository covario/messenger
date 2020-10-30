import { withKnobs } from '@storybook/addon-knobs';
import React from 'react';

import './_styleguide-colors.scss';

const colors = [
  {
    title: 'Grayscale',
    colors: [
      { var: 'moon', name: 'Moon', value: '#000' },
      { var: 'saturn', name: 'Saturn', value: '#242424' },
      { var: 'uranus', name: 'Uranus', value: '#343434' },
      { var: 'neptune', name: 'Neptune', value: '#5d5d5d' },
      { var: 'sun', name: 'Sun', value: '#fff' },
    ],
  },
  {
    title: 'Mercury',
    colors: [
      { var: 'mercury-tertiary', name: 'Mercury - Tertiary', value: '#009422' },
      { var: 'mercury', name: 'Mercury', value: '#14971b' },
      { var: 'mercury-secondary', name: 'Mercury - Secondary', value: '#00ff0e' },
    ],
  },
  {
    title: 'Venus',
    colors: [
      { var: 'venus-tertiary', name: 'Venus - Tertiary', value: '#aa5211' },
      { var: 'venus', name: 'Venus', value: '#fd9837' },
      { var: 'venus-secondary', name: 'Venus - Secondary', value: '#ffc981' },
    ],
  },
  {
    title: 'Earth',
    colors: [
      { var: 'earth-tertiary', name: 'Earth - Tertiary', value: '#db000a' },
      { var: 'earth', name: 'Earth', value: '#ff0900' },
      { var: 'earth-secondary', name: 'Earth - Secondary', value: '#ff563f' },
    ],
  },
  {
    title: 'Extra',
    colors: [
      { var: 'mars', name: 'Mars', value: '#408dff' },
      { var: 'jupiter', name: 'Jupiter', value: '#ff0097' },
      { var: 'pluto', name: 'Pluto', value: '#dedede' },
    ],
  },
];

const baseClass = 'styleguide-colors';

export default {
  title: 'Styleguide|Colors',
  decorators: [withKnobs],
};

export const Default = (): JSX.Element => {
  return (
    <div className={baseClass}>
      {colors.map((group) => (
        <div className={`${baseClass}__group`} key={group.title}>
          <p className={`${baseClass}__title`}>{group.title}</p>

          <div className={`${baseClass}__colors`}>
            {group.colors.map((color) => (
              <div
                className={`${baseClass}__color ${baseClass}__color--${color.var}`}
                key={color.value}
              >
                <p className={`${baseClass}__color-name`}>{color.name}</p>
                <p className={`${baseClass}__color-code`}>${color.var}</p>
                <p className={`${baseClass}__color-code`}>{color.value}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
