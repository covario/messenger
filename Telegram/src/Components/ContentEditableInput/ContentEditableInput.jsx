import React, { Component } from 'react';

import './_content-editable-input.scss';

const baseClass = 'content-editable-input';

class ContentEditableInput extends Component {
  noop = () => {};
  render() {
    const { placeholder, forwardedRef, onKeyDown, onKeyUp, onPaste, onInput, onFocus } = this.props;
    return (
      <>
        <div
          className={`${baseClass}`}
          ref={forwardedRef}
          placeholder={placeholder}
          contentEditable
          suppressContentEditableWarning
          onKeyDown={onKeyDown || this.noop}
          onKeyUp={onKeyUp || this.noop}
          onPaste={onPaste || this.noop}
          onInput={onInput || this.noop}
          onFocus={onFocus || this.noop}
        />
      </>
    );
  }
}

export default ContentEditableInput;
