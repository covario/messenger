import React from 'react';

import { Button } from './Button';
import { Icons } from '../Icon';

// Tests for Props behavior.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const fn = () => {
  return (
    <>
      <Button text="test" onClick={() => {}} />
      <Button text="test" icon={Icons.ALERT} onClick={() => {}} />
      <Button icon={Icons.ALERT} onClick={() => {}} />
      {/* @ts-expect-error */}
      <Button onClick={() => {}} />
    </>
  );
};
