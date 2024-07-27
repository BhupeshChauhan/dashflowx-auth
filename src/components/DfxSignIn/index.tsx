import { ifirebaseConfig, UseFirebase } from '@/Hooks/firebase';
import { signInWithPopup } from 'firebase/auth';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import BasicSignIn from './Varients/Basic';

const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Please enter a valid email' })
    .email({ message: 'Not a valid email' }),
  password: z
    .string()
    .min(1, { message: 'Please enter a valid password' })
    .max(20, { message: 'Password must be less than 20 characters' }),
});

interface iDfxSignIn {
  library: 'react' | 'next';
  type: any;
  forgetPasswordUrl: string;
  redirectSignupUrl: string;
  previewImg: string;
  previewTitle: string;
  PreviewDescription: string;
  firebaseConfig?: ifirebaseConfig | null;
  handleSignIn: (data: { email: string; password: string }) => void;
  isLoading?: boolean;
  handleSignOn?: (data: any) => void;
  handleSignOnError?: (error: any) => void;
  logoUrl: string;
  varient: 'basic';
}

const DfxSignIn = ({
  library,
  type,
  forgetPasswordUrl,
  redirectSignupUrl,
  previewImg,
  previewTitle,
  PreviewDescription,
  firebaseConfig,
  handleSignIn,
  isLoading,
  handleSignOn,
  handleSignOnError,
  logoUrl,
  varient = 'basic',
}: iDfxSignIn) => {
  const { auth, provider }: any = UseFirebase(firebaseConfig || null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginSchema),
  });
  const handleSubmitForm = (data: any) => {
    handleSignIn({ email: data.email, password: data.password });
  };

  const handleSubmitOn = (type: string) => {
    if (firebaseConfig && type === 'google') {
      signInWithPopup(auth, provider)
        .then((result) => {
          handleSignOn && handleSignOn(result);
        })
        .catch((error) => {
          handleSignOnError && handleSignOnError(error);
        });
    }
  };

  if (varient === 'basic') {
    return (
      <BasicSignIn
        logoUrl={logoUrl}
        firebaseConfig={firebaseConfig}
        handleSubmitOn={handleSubmitOn}
        handleSubmit={handleSubmit}
        handleSubmitForm={handleSubmitForm}
        register={register}
        errors={errors}
        isLoading={isLoading}
        library={library}
        type={type}
        forgetPasswordUrl={forgetPasswordUrl}
        redirectSignupUrl={redirectSignupUrl}
        PreviewDescription={PreviewDescription}
        previewTitle={previewTitle}
        previewImg={previewImg}
      />
    );
  }
};

export { DfxSignIn };
