import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import BasicForgetPassword from './Varients/Basic';
import { useAuth } from '../../Providers/AuthProvider.tsx';

const loginSchema = z.object({
  newpassword: z
    .string()
    .min(1, { message: 'Please enter a valid password' })
    .max(20, { message: 'Password must be less than 20 characters' }),
  confirmpassword: z
    .string()
    .min(1, { message: 'Please enter a valid password' })
    .max(20, { message: 'Password must be less than 20 characters' }),
});

interface iDfxResetPassword {
  library: 'react' | 'next';
  type: any;
  redirectSignInUrl: string;
  previewImg: string;
  previewTitle: string;
  PreviewDescription: string;
  handleResetPassword: (data: { password: string }) => void;
  isLoading?: boolean;
  varient: 'basic';
  showSignIn?: boolean;
  oobCode: string; // This is the oobCode received from the email link.
  email: string;
}

const DfxResetPassword = ({
  library,
  type,
  redirectSignInUrl,
  previewImg,
  previewTitle,
  PreviewDescription,
  handleResetPassword,
  isLoading,
  varient = 'basic',
  showSignIn = true,
  oobCode,
  email,
}: iDfxResetPassword) => {
  const { resetPassword, login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      newpassword: '',
      confirmpassword: '',
    },
    resolver: zodResolver(loginSchema),
  });
  const handleSubmitForm = (data: any) => {
    resetPassword(oobCode, data.confirmpassword)
      .then(() => {
        login(email, data.confirmpassword);
        handleResetPassword({
          password: data.confirmpassword,
        });
        console.log('Password reset successfully');
      })
      .catch((err: any) => {
        console.log(err, 'Error resetting password');
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

export { DfxResetPassword };
