export interface AuthorizedLayoutBodyInterface {
  children?: React.ReactNode;
}
export const AuthorizedLayoutBody: React.FunctionComponent<
  AuthorizedLayoutBodyInterface
> = ({ children }) => {
  return (
    <main className="container mx-auto pt-20 p-6 flex-grow">{children}</main>
  );
};
