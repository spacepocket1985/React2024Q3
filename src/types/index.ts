export type FormDataType = {
  name: string;
  age: number;
  gender: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
  country: string;
  picture: string | FileList;
};

export type FormType = {
  name: string;
  age: number;
  gender: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
  country: string;
  picture: FileList;
};
