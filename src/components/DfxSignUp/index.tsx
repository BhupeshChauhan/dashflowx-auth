import { ifirebaseConfig, UseFirebase } from '@/Hooks/firebase';
import { signInWithPopup } from 'firebase/auth';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import BasicSignup from './Varients/Basic';

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

interface iDfxSignUp {
  library: 'react' | 'next';
  type: any;
  redirectSignupUrl: string;
  previewImg: string;
  previewTitle: string;
  PreviewDescription: string;
  firebaseConfig?: ifirebaseConfig | null;
  handleSignIn: (data: {
    username: string;
    email: string;
    password: string;
  }) => void;
  isLoading?: boolean;
  handleSignOn?: (data: any) => void;
  handleSignOnError?: (error: any) => void;
  logoUrl: string;
  varient: 'basic';
  showSignIn?: boolean;
}

const DfxSignUp = ({
  library,
  type,
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
  showSignIn = true,
}: iDfxSignUp) => {
  const { auth, provider }: any = UseFirebase(firebaseConfig || null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
    resolver: zodResolver(loginSchema),
  });
  const handleSubmitForm = (data: any) => {
    handleSignIn({
      username: data.username,
      email: data.email,
      password: data.password,
    });
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
      <BasicSignup
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
        redirectSignupUrl={redirectSignupUrl}
        PreviewDescription={PreviewDescription}
        previewTitle={previewTitle}
        previewImg={previewImg}
        showSignIn={showSignIn}
      />
    );
  }
};

export { DfxSignUp };
