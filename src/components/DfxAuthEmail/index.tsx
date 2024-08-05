import DfxRecoverEmail from '../DfxRecoverEmail';
import { DfxResetPassword } from '../DfxResetPassword';
import DfxVerifyEmail from '../DfxVerifyEmail';

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
  email,
}: any) => {
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
        email={email}
      />
    );
  }
  if (mode === 'recoverEmail') {
    return <DfxRecoverEmail />;
  }
  if (mode === 'verifyEmail') {
    return <DfxVerifyEmail />;
  }
};

export default DfxAuthEmail;
