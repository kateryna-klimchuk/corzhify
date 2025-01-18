import { AuthorizedLayout } from "~/components/AuthorizedLayout/AuthorizedLayout";

export default function OverviewPage() {
  return (
    <AuthorizedLayout.Page>
      <div>
        <h1>Welcome to the Corzhify Overview</h1>
        <p>
          Discover the best products, latest trends, and everything Corzhify has
          to offer. Start browsing!
        </p>
        <div>
          <h2>Featured Products</h2>
          <ul>
            <li>Product 1</li>
            <li>Product 2</li>
            <li>Product 3</li>
          </ul>
        </div>
      </div>
    </AuthorizedLayout.Page>
  );
}
