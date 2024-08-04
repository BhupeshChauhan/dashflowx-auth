import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import BasicSignIn from './Varients/Basic';
import { useAuth } from '@/Providers/AuthProvider';

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
  handleSignIn: (data: { email: string; password: string }) => void;
  isLoading?: boolean;
  handleSignOn?: (data: any) => void;
  handleSignOnError?: (error: any) => void;
  logoUrl: string;
  varient: 'basic';
  showSignUp?: boolean;
}

const DfxSignIn = ({
  library,
  type,
  forgetPasswordUrl,
  redirectSignupUrl,
  previewImg,
  previewTitle,
  PreviewDescription,
  handleSignIn,
  isLoading,
  handleSignOn,
  handleSignOnError,
  logoUrl,
  varient = 'basic',
  showSignUp = true,
}: iDfxSignIn) => {
  const { login, signInWithGoogle } = useAuth();
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
    login(data.email, data.password)
      .then(() => {
        handleSignIn({ email: data.email, password: data.password });
        console.log('Password reset successfully');
      })
      .catch((err: any) => {
        console.log(err, 'Error resetting password');
      });
  };

  const handleSubmitOn = (type: string) => {
    if (type === 'google') {
      signInWithGoogle()
        .then((user: any) => handleSignOn && handleSignOn(user))
        .catch((error: any) => handleSignOnError && handleSignOnError(error));
    }
  };

  if (varient === 'basic') {
    return (
      <BasicSignIn
        logoUrl={logoUrl}
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
        showSignUp={showSignUp}
      />
    );
  }
};

export { DfxSignIn };
