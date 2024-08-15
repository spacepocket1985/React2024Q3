import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import validationSchema from '../utils/validationSchema';
import { FormType } from '../types';
import { UIFormInput } from '../ui/UIFormInput';

import styles from '../styles/form.module.css';
import { useAppSelector } from '../hooks/storeHooks';

export const ReactFrom = (): JSX.Element => {
  const gender = useAppSelector((state) => state.selectData.gender);
  const countries = useAppSelector((state) => state.selectData.countries);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormType>({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<FormType> = (data) => {};
  return (
    <>
      <h1>ReactFrom</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <UIFormInput
          controlType="input"
          type="text"
          name="name"
          register={register}
          placeholder="name"
          required
          error={errors.name?.message ? errors.name?.message : ''}
        />
        <div className={styles.line}>
          <UIFormInput
            controlType="select"
            name="gender"
            register={register}
            error={errors.gender?.message ? errors.gender?.message : ''}
            options={gender}
            required
          />
          <UIFormInput
            controlType="input"
            name="age"
            register={register}
            error={errors.age?.message ? errors.age?.message : ''}
            required
            placeholder="age"
          />
        </div>
        <UIFormInput
          controlType="input"
          name="email"
          register={register}
          error={errors.email?.message ? errors.email?.message : ''}
          required
          placeholder="email"
        />
        <UIFormInput
          controlType="input"
          name="password"
          type="password"
          register={register}
          error={errors.password?.message ? errors.password?.message : ''}
          required
          placeholder="password"
        />

        <UIFormInput
          controlType="input"
          name="confirmPassword"
          type="password"
          register={register}
          error={
            errors.confirmPassword?.message
              ? errors.confirmPassword?.message
              : ''
          }
          required
          placeholder="confirmPassword"
        />
        <UIFormInput
          controlType="select"
          name="country"
          register={register}
          error={errors.country?.message ? errors.country?.message : ''}
          options={countries}
          required
        />
        <div className={styles.imgWrapper}>
          <UIFormInput
            controlType="input"
            type="file"
            name="picture"
            register={register}
            placeholder="picture"
            required
            error={errors.picture?.message ? errors.picture?.message : ''}
          />
        </div>
        <div className={styles.lineforCheckBox}>
        <label className="termLabel">I have read and agree to terms and conditions</label>
        <UIFormInput
         controlType='input'
         type='checkbox'
         name="acceptTerms"
         register={register}
         placeholder="acceptTerms"
         required
         error={errors.acceptTerms?.message ? errors.acceptTerms?.message : ''}
         />
        </div>
        <input type="submit" disabled={!isValid} />
      </form>
    </>
  );
};
