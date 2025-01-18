import type { MetaFunction } from "@remix-run/node";
import { AuthorizedLayout } from "~/components/AuthorizedLayout/AuthorizedLayout";

export const meta: MetaFunction = () => {
  return [
    { title: "Corzhify" },
    { name: "description", content: "Welcome to Corzhify!" },
  ];
};

export default function Index() {
  return (
    <AuthorizedLayout.Page>
      <div className="px-4">
        <h2>Welcome to Corzhify family!</h2>
      </div>
    </AuthorizedLayout.Page>
  );
}
