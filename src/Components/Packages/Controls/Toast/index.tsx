import { useEffect, useState } from 'react';

export enum ToastType {
  sucess = 'sucess',
  failure = 'faliure',
}

interface Props {
  text: string;
  type: ToastType;
  isVisible: boolean;
  setToastVisibility: (value: boolean) => void;
}

function Toast(props: Props) {
  useEffect(() => {
    if (props.isVisible) {
      show();
    }
  }, [props.isVisible]);

  function show() {
    props.setToastVisibility(true);
    setTimeout(() => {
      props.setToastVisibility(false);
    }, 2000);
  }

  return (
    <>
      {props.isVisible && (
        <div className={`toast-container ${props.text}`}> {props.text}</div>
      )}
    </>
  );
}
export default Toast;
