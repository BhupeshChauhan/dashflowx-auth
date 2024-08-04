import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import BasicSignup from './Varients/Basic';
import { useAuth } from '@/Providers/AuthProvider';

const loginSchema = z.object({
  username: z
    .string()
    .min(1, { message: 'Please enter a valid Username' })
    .max(20, { message: 'Username must be less than 20 characters' }),
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
  redirectSignInUrl: string;
  previewImg: string;
  previewTitle: string;
  PreviewDescription: string;
  handleSignUp: (data: {
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
  redirectSignInUrl,
  previewImg,
  previewTitle,
  PreviewDescription,
  handleSignUp,
  isLoading,
  handleSignOn,
  handleSignOnError,
  logoUrl,
  varient = 'basic',
  showSignIn = true,
}: iDfxSignUp) => {
  const { signUp, signInWithGoogle } = useAuth();
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
    signUp(data.email, data.password)
      .then(() => {
        handleSignUp({
          username: data.username,
          email: data.email,
          password: data.password,
        });
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
      <BasicSignup
        logoUrl={logoUrl}
        handleSubmitOn={handleSubmitOn}
        handleSubmit={handleSubmit}
        handleSubmitForm={handleSubmitForm}
        register={register}
        errors={errors}
        isLoading={isLoading}
        library={library}
        type={type}
        redirectSignInUrl={redirectSignInUrl}
        PreviewDescription={PreviewDescription}
        previewTitle={previewTitle}
        previewImg={previewImg}
        showSignIn={showSignIn}
      />
    );
  }
};

export { DfxSignUp };
