import { useForm, SubmitHandler } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import validationSchema from '../utils/validationSchema';
import { FormDataType, FormType, submitFormType } from '../types';
import { UIFormInput } from '../ui/UIFormInput';

import styles from '../styles/form.module.css';
import { useAppDispatch, useAppSelector } from '../hooks/storeHooks';
import { convertBase64 } from '../utils/convertBase64';
import { useNavigate } from 'react-router-dom';
import { setData } from '../store/slices/formsDataSlice';
import { useState } from 'react';
import { getPasswordStrength } from '../utils/getPasswordStrength';

export const ReactFrom = (): JSX.Element => {
  const [strength, setStrength] = useState('');
  const gender = useAppSelector((state) => state.selectData.gender);
  const countries = useAppSelector((state) => state.selectData.countries);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,setValue,
    formState: { errors, isValid },
  } = useForm<submitFormType>({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setValue('password', newPassword);
    setStrength(getPasswordStrength(newPassword));
  };

  const onSubmit: SubmitHandler<FormType> = async (data) => {
    if (data.picture![0] instanceof File) {
      const image2Base64 = await convertBase64(data.picture![0]);
      const newData: FormDataType = { ...data, picture: image2Base64 };

      dispatch(setData(newData));

      navigate('/');
    } else {
      throw new Error('Invalid picture type');
    }
  };
  return (
    <>
      <h1>React-From</h1>
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
          <label htmlFor="password">
          <input
            type="password"
            onChange={(e) => {  
              handlePasswordChange(e);  
              register('password').onChange(e); // 
            }}  
            
            name="password"
            autoComplete="on"
            placeholder="password"
          />
          <div className={styles.invalidFeedback}>{errors.password?.message}</div>
          <div className={styles.pasStrengthWrapper}>
            <div className={styles.pasStrengthTitle}>Password strength:</div><div className={styles.pasStrengthValue}><strong>{` ${strength}`}</strong></div>
          </div>
        </label>

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
          <label className={styles.termLabel}>
            I have read and agree to terms and conditions
          </label>
          <UIFormInput
            controlType="input"
            type="checkbox"
            name="acceptTerms"
            register={register}
            placeholder="acceptTerms"
            required
            error={
              errors.acceptTerms?.message ? errors.acceptTerms?.message : ''
            }
          />
        </div>
        <input type="submit" disabled={!isValid} />
      </form>
    </>
  );
};
