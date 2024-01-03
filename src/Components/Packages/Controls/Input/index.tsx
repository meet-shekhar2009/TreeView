import classNames from 'classnames';
import { ChangeEvent } from 'react';

interface Props {
  type?: string;
  placeholder: string;
  name: string;
  cssClass?: string;
  model: { [key: string]: any };
  handleChange?: (event: ChangeEvent<HTMLInputElement>) => undefined;
  setModel: (value: any) => void;
}

function Input({
  type,
  placeholder,
  name,
  model,
  handleChange,
  cssClass,
  setModel,
}: Props) {
  function handleTextChange(event: ChangeEvent<HTMLInputElement>) {
    setModel({ ...model, [name]: event.target.value });
  }

  return (
    <input
      type={type || 'text'}
      placeholder={placeholder}
      value={model[name]}
      className={classNames('text-box full-width', cssClass)}
      name={name}
      onChange={handleChange || handleTextChange}
    />
  );
}

export default Input;
