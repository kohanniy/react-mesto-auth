import React from 'react';
import ClosePopupButton from './ClosePopupButton';
import { handleStopPropagation } from '../utils/utils';

function Popup(props) {
  const { data, onClose, isImagePopup, children } = props;
  let classNamePopupContainer = 'popup__container';

  if (!isImagePopup) classNamePopupContainer += ' popup__container_form-tooltip'

  return (
    <div onClick={onClose} className={`popup ${data ? 'popup_opened' : 'popup_closed'}`}>
      <div onClick={handleStopPropagation} className={classNamePopupContainer}>
        {children}
        <ClosePopupButton onClose={onClose} />
      </div>
    </div>
  );
}

export default Popup;
