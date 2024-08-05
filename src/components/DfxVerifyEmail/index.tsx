/* eslint-disable react-hooks/exhaustive-deps */
import { useAuth } from '@/Providers/AuthProvider';
import { useEffect } from 'react';

interface iDfxVerifyEmail {
  oobCode: string;
  handleEmailVerified: (continueUrl: string) => void;
  handleEmailVerificationError?: () => void;
  continueUrl: string; // The URL to redirect to after email verification.
}
const DfxVerifyEmail = ({
  oobCode,
  handleEmailVerified,
  handleEmailVerificationError,
  continueUrl,
}: iDfxVerifyEmail) => {
  const { handleVerifyEmail } = useAuth();
  useEffect(() => {
    handleVerifyEmail(oobCode)
      .then(() => {
        handleEmailVerified(continueUrl);
        console.log('Email verified successfully');
      })
      .catch((err: any) => {
        console.log(err, 'Error verifying email');
        handleEmailVerificationError && handleEmailVerificationError();
      });
  }, []);

  return <></>;
};

export default DfxVerifyEmail;
