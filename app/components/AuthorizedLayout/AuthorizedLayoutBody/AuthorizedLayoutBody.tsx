export interface AuthorizedLayoutBodyInterface {
  children?: React.ReactNode;
}
export const AuthorizedLayoutBody: React.FunctionComponent<
  AuthorizedLayoutBodyInterface
> = ({ children }) => {
  return <main className="flex-1 flex flex-col px-8 py-4">{children}</main>;
};
