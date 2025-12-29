export interface AuthorizedLayoutRootInterface {
  children?: React.ReactNode;
}

export const AuthorizedLayoutRoot: React.FunctionComponent<
  AuthorizedLayoutRootInterface
> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-grow flex flex-col">
        {children}
      </div>
    </div>
  );
};
