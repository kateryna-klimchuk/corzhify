export interface AuthorizedLayoutRootInterface {
  children?: React.ReactNode;
}

export const AuthorizedLayoutRoot: React.FunctionComponent<
  AuthorizedLayoutRootInterface
> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 mx-auto px-6 sm:px-24">
      {children}
    </div>
  );
};
