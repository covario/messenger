import React from 'react';

import { Button } from '../Button';
import { Intent } from '../../common/intent';

interface Props {
  onSubmit: (args: { value: string }) => void;
  submitButtonText?: string;
  placeholder?: string;
  disabled?: boolean;
}

const baseClass = 'chat-command-bar';

const defaultProps = {
  submitButtonText: 'Send',
  placeholder: 'Type message',
  disabled: false,
};

export const ChatCommandBar = React.forwardRef<HTMLInputElement, Props>(
  function ChatCommandBarWithRef(
    { placeholder, onSubmit, submitButtonText = defaultProps.submitButtonText, disabled }: Props,
    ref,
  ): JSX.Element {
    const onSubmitForm = React.useCallback(
      (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const input = event.currentTarget.elements.namedItem('message') as HTMLInputElement | null;

        if (!input || !input.value) {
          return;
        }

        onSubmit({ value: input.value });

        input.value = '';
      },
      [onSubmit],
    );

    return (
      <div className={baseClass}>
        <form className={`${baseClass}__form`} autoComplete="off" onSubmit={onSubmitForm}>
          <input
            className={`${baseClass}__message-input`}
            name="message"
            placeholder={placeholder}
            ref={ref}
            disabled={disabled}
            type="text"
          />

          <Button
            disabled={disabled}
            className={`${baseClass}__send-button`}
            intent={Intent.Primary}
            onClick={() => {}}
            text={submitButtonText}
            type="submit"
          />
        </form>
      </div>
    );
  },
);

ChatCommandBar.defaultProps = defaultProps;
