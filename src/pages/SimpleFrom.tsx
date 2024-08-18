import { useNavigate } from 'react-router';

import { ValidationError } from 'yup';

import { useState, useRef, FormEvent } from 'react';
import validationSchema from '../utils/validationSchema';
import { useAppDispatch, useAppSelector } from '../hooks/storeHooks';
import { convertBase64 } from '../utils/convertBase64';
import { FormDataType } from '../types';
import { setData } from '../store/slices/formsDataSlice';

import { getPasswordStrength, PasswordStrengthIndicator } from '../components/passwordStrengthIndicator/PasswordStrengthIndicator';
import styles from '../styles/form.module.css';

export const SimpleFrom = (): JSX.Element => {
  const navigate = useNavigate();
  const [strength, setStrength] = useState('');
  const [formErrors, setErrors] = useState<Record<string, string>>({});

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const pictureRef = useRef<HTMLInputElement>(null);
  const tcRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const countriesRef = useRef<HTMLSelectElement>(null);

  const gender = useAppSelector((state) => state.selectData.gender);
  const countries = useAppSelector((state) => state.selectData.countries);

  const dispatch = useAppDispatch();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const formData = {
      name: nameRef.current?.value,
      age: ageRef.current?.value,
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
      confirmPassword: confirmPasswordRef.current?.value,
      gender: genderRef.current?.value,
      acceptTerms: tcRef.current?.checked,
      picture: pictureRef.current?.files,
      country: countriesRef.current?.value,
    };

    const isFormValid = await validationSchema.isValid(formData);
    setStrength(getPasswordStrength(formData.password || ''));
    if (isFormValid) {
      if (formData.picture![0] instanceof File) {
        const image2Base64 = await convertBase64(formData.picture![0]);
        const newData: FormDataType = { ...formData, picture: image2Base64 };
        dispatch(setData(newData));

        navigate('/');
      } else {
        throw new Error('Invalid picture type');
      }
    }

    if (!isFormValid) {
      await validationSchema
        .validate(formData, { abortEarly: false })
        .catch((err) => {
          if (err instanceof ValidationError) {
            const errors: Record<string, string> = {};
            err.inner.forEach((item) => {
              if (item.path) {
                errors[item.path] = item.message;
                setErrors(errors);
              }
            });
          }
        });
    }
  }
  return (
    <>
      <h1>Simple-Form</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          <input type="text" name="name" ref={nameRef} placeholder="name" />
          <div className={styles.invalidFeedback}>{formErrors.name}</div>
        </label>
        <div className={styles.line}>
          <label htmlFor="gender">
            <div className={styles.selectWrapper}>
              <span>{`Select gender`}</span>
              <select name="gender" ref={genderRef}>
                {gender.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.invalidFeedback}>{formErrors.gender}</div>
          </label>

          <label htmlFor="age">
            <input name="age" ref={ageRef} placeholder="age" id="name" />
            <div className={styles.invalidFeedback}>{formErrors.age}</div>
          </label>
        </div>
        <label htmlFor="email">
          <input name="email" ref={emailRef} placeholder="email" />
          <div className={styles.invalidFeedback}>{formErrors.email}</div>
        </label>
        <label htmlFor="password">
          <input
            type="password"
            name="password"
            ref={passwordRef}
            autoComplete="on"
            placeholder="password"
          />
          <div className={styles.invalidFeedback}>{formErrors.password}</div>
          <PasswordStrengthIndicator password={strength}/>
        </label>
        <label htmlFor="confirmPassword">
          <input
            autoComplete="on"
            type="password"
            name="confirmPassword"
            placeholder="confirmPassword"
            ref={confirmPasswordRef}
          />
          <div className={styles.invalidFeedback}>
            {formErrors.confirmPassword}
          </div>
        </label>
        <label htmlFor="country">
          <div className={styles.selectWrapper}>
            <span>{`Select country`}</span>
            <select name="country" ref={countriesRef}>
              {countries.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.invalidFeedback}>{formErrors.country}</div>
        </label>
        <div className={styles.imgWrapper}>
          <label htmlFor="picture">
            <input type="file" name="picture" ref={pictureRef} />
            <div className={styles.invalidFeedback}>{formErrors.picture}</div>
          </label>
        </div>
        <div className={styles.lineforCheckBox}>
          <label className={styles.termLabel}>
            I have read and agree to terms and conditions
          </label>
          <label htmlFor="acceptTerms">
            <input type="checkbox" name="acceptTerms" ref={tcRef} />
            <div className={styles.invalidFeedback}>
              {formErrors.acceptTerms}
            </div>
          </label>
        </div>

        <input type="submit" />
      </form>
    </>
  );
};
