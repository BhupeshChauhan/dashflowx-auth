import { Button, Input2, TypographyComp } from '@dashflowx/core';
import { FcGoogle } from 'react-icons/fc';

interface iBasicSignUp {
  library: 'react' | 'next';
  type: any;
  redirectSignInUrl: string;
  previewImg: string;
  previewTitle: string;
  PreviewDescription: string;
  isLoading?: boolean;
  logoUrl: string;
  register: any;
  errors: any;
  handleSubmitOn: (type: string) => void;
  handleSubmit: any;
  handleSubmitForm: (data: any) => void;
  showSignIn: boolean;
  showSignOn?: boolean;
}
const BasicSignUp = ({
  logoUrl,
  handleSubmitOn,
  handleSubmit,
  handleSubmitForm,
  register,
  errors,
  isLoading,
  library,
  type,
  redirectSignInUrl,
  PreviewDescription,
  previewTitle,
  previewImg,
  showSignIn,
  showSignOn,
}: iBasicSignUp) => {
  return (
    <div className="flex flex-wrap w-screen h-screen">
      <div className="flex w-full flex-col md:w-[40%]">
        <div className="w-[80%] ml-12 my-auto flex flex-col pt-8 md:px-6 md:pt-0">
          <a
            href="#"
            className="py-4 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img className={'w-auto h-10'} src={logoUrl} alt="" />
          </a>
          {showSignOn && (
            <>
              <p className="text-left text-3xl font-bold">
                Create a new account
              </p>
              <button
                className="-2 mt-8 flex items-center justify-center rounded-md border px-4 py-1 outline-none ring-gray-400 ring-offset-2 transition focus:ring-2 hover:border-transparent hover:bg-black hover:text-white"
                onClick={() => handleSubmitOn('google')}
              >
                <FcGoogle className="mr-2" />
                Sign Up with Google
              </button>
              <div className="relative mt-8 flex h-px place-items-center bg-gray-200">
                <div className="absolute left-1/2 h-6 w-14 -translate-x-1/2 bg-white text-center text-sm text-gray-500">
                  or
                </div>
              </div>
            </>
          )}
          <form
            className="flex flex-col pt-3 md:pt-8"
            onSubmit={handleSubmit(handleSubmitForm)}
          >
            <div className="flex flex-col pt-4">
              <Input2
                type="username"
                id="login-username"
                className="w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                placeholder="First and Last Name"
                fullwidth={true}
                {...register('username', { required: true })}
                errorMsg={errors.username?.message}
              />
            </div>
            <div className="flex flex-col pt-4">
              <Input2
                type="email"
                id="login-email"
                className="w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                placeholder="Email"
                fullwidth={true}
                {...register('email', { required: true })}
                errorMsg={errors.email?.message}
              />
            </div>
            <div className="mb-12 flex flex-col pt-4">
              <Input2
                type="password"
                id="login-password"
                className="w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                placeholder="Password"
                fullwidth={true}
                {...register('password', { required: true })}
                errorMsg={errors.password?.message}
              />
            </div>
            <Button
              variant="solid"
              color="primary"
              type="submit"
              className="w-full rounded-lg px-4 py-2 text-center text-base font-semibold shadow-md ring-gray-500 ring-offset-2 transition focus:ring-2"
              fullwidth={true}
              disabled={isLoading}
            >
              Sign Up
            </Button>
          </form>
          {showSignIn && (
            <div className="py-12 text-center">
              <p className="whitespace-nowrap text-gray-600">
                Already have an account?{' '}
                {library === 'react' && (
                  <TypographyComp
                    as={type}
                    to={redirectSignInUrl}
                    className="underline-offset-4 font-semibold text-primary underline"
                  >
                    Sign In
                  </TypographyComp>
                )}
                {library === 'next' && (
                  <TypographyComp
                    as={type}
                    href={redirectSignInUrl}
                    className="underline-offset-4 font-semibold text-primary underline"
                  >
                    Sign In
                  </TypographyComp>
                )}
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="pointer-events-none relative hidden h-screen select-none bg-black md:block md:w-[60%]">
        <div className="absolute bottom-0 z-10 px-8 text-white opacity-100">
          <p className="mb-8 text-3xl font-semibold leading-10">
            {PreviewDescription}
          </p>
          <p className="mb-7 text-sm opacity-70">{previewTitle}</p>
        </div>
        <img
          className="-z-1 absolute top-0 h-full w-full object-cover opacity-90"
          src={previewImg}
        />
      </div>
    </div>
  );
};

export default BasicSignUp;
