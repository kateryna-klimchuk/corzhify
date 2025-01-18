export interface AuthorizedLayoutFooterInterface {
  children?: React.ReactNode;
}
export const AuthorizedLayoutFooter: React.FunctionComponent<
  AuthorizedLayoutFooterInterface
> = ({ children }) => {
  return (
    <footer className="px-6 py-4">
      <p>© 2025 Corzhify. All rights reserved.</p>
    </footer>
  );
};
