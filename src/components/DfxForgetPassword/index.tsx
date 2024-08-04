import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import BasicForgetPassword from './Varients/Basic';
import { useAuth } from '@/Providers/AuthProvider';

const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Please enter a valid email' })
    .email({ message: 'Not a valid email' }),
});

interface iDfxForgetPassword {
  library: 'react' | 'next';
  type: any;
  redirectSignInUrl: string;
  previewImg: string;
  previewTitle: string;
  PreviewDescription: string;
  handleForgotPassword: (data: { email: string }) => void;
  isLoading?: boolean;
  handleSignOn?: (data: any) => void;
  handleSignOnError?: (error: any) => void;
  varient: 'basic';
  showSignIn?: boolean;
}

const DfxForgetPassword = ({
  library,
  type,
  redirectSignInUrl,
  previewImg,
  previewTitle,
  PreviewDescription,
  isLoading,
  varient = 'basic',
  showSignIn = true,
}: iDfxForgetPassword) => {
  const { forgotPassword } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(loginSchema),
  });
  const handleSubmitForm = (data: any) => {
    forgotPassword(data.email)
      .then(() => {
        console.log('Email sent successfully');
      })
      .catch((err: any) => {
        console.log(err, 'Error sending email');
      });
  };

  if (varient === 'basic') {
    return (
      <BasicForgetPassword
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

export { DfxForgetPassword };
