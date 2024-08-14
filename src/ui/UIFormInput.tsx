import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

type UiFormInputProps<T extends FieldValues> = {
  type: React.HTMLInputTypeAttribute;
  name: Path<T>;
  register: UseFormRegister<T>;
  required: boolean;
  placeholder: string;
  error: string | null;
};

export const UIFormInput = <T extends FieldValues>({
  type,
  name,
  register,
  required,
  placeholder,
  error = '',
}: UiFormInputProps<T>): JSX.Element => {
  return (
    <label htmlFor={name} className="lableInput">
      <input
        id={name}
        type={type}
        className={`inputStyle,
          ${error ? 'isInvalid' : ''}`}
        {...register(name, { required })}
        placeholder={placeholder}
      />
      <div className="invalidFeedback">{error}</div>
    </label>
  );
};
