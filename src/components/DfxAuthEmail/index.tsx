import DfxRecoverEmail from '../DfxRecoverEmail';
import { DfxResetPassword } from '../DfxResetPassword';
import DfxVerifyEmail from '../DfxVerifyEmail';

interface iDfxAuthEmail {
  mode: string;
  library: 'react' | 'next';
  type: any;
  redirectSignInUrl: string;
  previewImg: string;
  previewTitle: string;
  PreviewDescription: string;
  handleResetPassword: (data: any) => void;
  isLoading?: boolean;
  varient: 'basic';
  showSignIn?: boolean;
  oobCode: string;
  email?: string;
  handleEmailVerified?: () => void;
  handleEmailVerificationError?: (err: any) => void;
}
const DfxAuthEmail = ({
  mode,
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
  handleEmailVerified,
  handleEmailVerificationError,
}: iDfxAuthEmail) => {
  if (mode === 'resetPassword') {
    return (
      <DfxResetPassword
        library={library}
        type={type}
        redirectSignInUrl={redirectSignInUrl}
        previewImg={previewImg}
        previewTitle={previewTitle}
        PreviewDescription={PreviewDescription}
        handleResetPassword={handleResetPassword}
        oobCode={oobCode}
        isLoading={isLoading}
        varient={varient}
        showSignIn={showSignIn}
      />
    );
  }
  if (mode === 'recoverEmail') {
    return <DfxRecoverEmail />;
  }
  if (mode === 'verifyEmail') {
    return (
      <DfxVerifyEmail
        oobCode={oobCode}
        handleEmailVerified={handleEmailVerified}
        handleEmailVerificationError={handleEmailVerificationError}
      />
    );
  }
};

export { DfxAuthEmail };
