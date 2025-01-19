export interface AuthorizedLayoutBodyInterface {
  children?: React.ReactNode;
}
export const AuthorizedLayoutBody: React.FunctionComponent<
  AuthorizedLayoutBodyInterface
> = ({ children }) => {
  return <main className="container mx-auto p-6">{children}</main>;
};
