import * as Yup from 'yup';

const validationSchema = Yup.object({
  name: Yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 6 characters')
    .matches(/^[A-ZА-ЯЁ]/, 'The first letter of the name must be capital'),
  age: Yup.number()
    .required('Age is required')
    .typeError('Age should be number')
    .min(0, 'No negative values'),
  email: Yup.string()
    .required('Email is required')
    .email('Email is invalid')
    .matches(
      /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/,
      'errorValidationEmailInvalidOrDomain'
    )
    .matches(
      /^[\w!#$%&'*+\-/=?^_`{|}~]+(?:\.[\w!#$%&'*+\-/=?^_`{|}~]+)*@[\w-]+(?:\.[\w-]+)*(?:\.[a-zA-Z]{2,})?$/,
      'errorValidationEmailInvalidLocalToggle'
    ),
  gender: Yup.string().required('Choose gender'),
  password: Yup.string()
    .required('Password is required')
    .matches(
      /[A-ZА-ЯЁ]/,
      'Password strength: must have at least one uppercase letter'
    )
    .matches(
      /[a-zа-яё]/,
      'Password strength: must have at least one lowercase letter'
    )
    .matches(/[0-9]/, 'Password strength: must have at least one digit')
    .matches(
      /[^A-ZА-Яa-zа-я0-9Ёё\s]/,
      'Pas must contain at least one special character(!@#$%^&*)'
    ),
  confirmPassword: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password')], 'Confirm Password does not match'),
  acceptTerms: Yup.boolean()
    .required('Accept T&C is required')
    .oneOf([true], 'Accept T&C'),
  country: Yup.string().required('Country is required'),
  picture: Yup.mixed<FileList>()
    .required('You need to provide a file')
    .test('fileSize', 'You need to provide a file', (files) => {
      if (files?.length > 1) {
        return false;
      }
      return files.length === 1;
    })
    .test('fileSize', 'The file is too large (picture size < 1Mb)', (files) => {
      if (files?.length !== 1) {
        return false;
      }
      return files && files[0].size <= 1000000;
    })
    .test(
      'type',
      'Only the following formats are accepted: .jpg, .png',
      (files) => {
        if (files?.length !== 1) {
          return false;
        }
        return (
          files &&
          (files[0].type === 'image/jpeg' || files[0].type === 'image/png')
        );
      }
    ),
});

export default validationSchema;
