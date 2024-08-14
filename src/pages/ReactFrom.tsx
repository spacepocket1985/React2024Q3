import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import validationSchema from '../utils/validationSchema';
import { FormType } from '../types';
import { UIFormInput } from '../ui/UIFormInput';

export const ReactFrom = (): JSX.Element => {
  
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormType>({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<FormType> = (data) => {
    
  };
  return (
    <>
      <h1>ReactFrom</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <UIFormInput
          type="text"
          name="name"
          register={register}
          placeholder="name"
          required
          error={errors.name?.message ? errors.name?.message : ''}
        />
         <input type="submit" disabled={!isValid} />
      </form>
    </>
  );
};
