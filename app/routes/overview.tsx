import { MetaFunction } from "@remix-run/node";
import { AuthorizedLayout } from "~/components/AuthorizedLayout/AuthorizedLayout";
export const meta: MetaFunction = () => {
  return [
    { title: "Corzhify - Overview" },
    { name: "description", content: "Corzhify - Overview" },
  ];
};

// export const loader = async () => {
//   return null;
// };
export default function OverviewPage() {
  return (
    <AuthorizedLayout.Page activePage={""}>
      <div>
        <h1>Welcome to the Corzhify Overview</h1>
        <p>
          Discover the best products, latest trends, and everything Corzhify has
          to offer. Start browsing!
        </p>
      </div>
    </AuthorizedLayout.Page>
  );
}
