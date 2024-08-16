import { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import styles from '../styles/uiFormInput.module.css'

type UiFormInputProps<T extends FieldValues> = {
  controlType: 'input' | 'select';
  type?: React.HTMLInputTypeAttribute;
  name: Path<T>;
  register: UseFormRegister<T>;
  required: boolean;
  placeholder?: string;
  options?: Array<string>;
  error: string | null;
};

export const UIFormInput = <T extends FieldValues>({
  controlType,
  type,
  name,
  register,
  required,
  placeholder,
  options = [],
  error = '',
}: UiFormInputProps<T>): JSX.Element => {
  return (
    <label htmlFor={name}>
      {controlType === 'input' && (
        <input
          id={name}
          type={type}
          autoComplete={type === 'password'? 'on' : ''}
          className={`${error ? 'isInvalid' : ''}`}
          {...register(name, { required })}
          placeholder={placeholder}
        />
      )}

      {controlType === 'select' && (
        <div className={styles.selectWrapper}>
          <span>{`Select ${name}`}</span>
          <select
          autoComplete='on'
          id={name}
          className={`inputStyle ${error ? 'isInvalid' : ''}`}
          {...register(name, { required })}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
          </div>

      )}

      <div className={styles.invalidFeedback}>{error}</div>
    </label>
  );
};
