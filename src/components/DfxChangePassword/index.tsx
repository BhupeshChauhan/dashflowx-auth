import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../Providers/AuthProvider.tsx';
import BasicChangePassword from './Varients/Basic.tsx';

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

interface iDfxChangePassword {
  library: 'react' | 'next';
  type: any;
  redirectSignInUrl: string;
  handleChangePassword: (data: { password: string }) => void;
  isLoading?: boolean;
  varient: 'basic';
  showSignIn?: boolean;
}

const DfxChangePassword = ({
  library,
  type,
  redirectSignInUrl,
  handleChangePassword,
  isLoading,
  varient = 'basic',
  showSignIn = true,
}: iDfxChangePassword) => {
  const { changePassword } = useAuth();
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
    changePassword(data.confirmpassword)
      .then(() => {
        handleChangePassword({
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
      <BasicChangePassword
        handleSubmit={handleSubmit}
        handleSubmitForm={handleSubmitForm}
        register={register}
        errors={errors}
        isLoading={isLoading}
        library={library}
        type={type}
        redirectSignInUrl={redirectSignInUrl}
        showSignIn={showSignIn}
      />
    );
  }
};

export { DfxChangePassword };
