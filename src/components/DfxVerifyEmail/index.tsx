/* eslint-disable react-hooks/exhaustive-deps */
import { useAuth } from '@/Providers/AuthProvider';
import { useEffect } from 'react';

interface iDfxVerifyEmail {
  oobCode: string;
  handleEmailVerified?: () => void;
  handleEmailVerificationError?: (err: any) => void;
}
const DfxVerifyEmail = ({
  oobCode,
  handleEmailVerified,
  handleEmailVerificationError,
}: iDfxVerifyEmail) => {
  const { handleVerifyEmail } = useAuth();
  useEffect(() => {
    handleVerifyEmail(oobCode)
      .then(() => {
        handleEmailVerified && handleEmailVerified();
      })
      .catch((err: any) => {
        handleEmailVerificationError && handleEmailVerificationError(err);
      });
  }, []);

  return <></>;
};

export default DfxVerifyEmail;
