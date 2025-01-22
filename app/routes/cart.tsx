import { MetaFunction } from "@remix-run/node";
import {
  Link,
  useLoaderData,
  useLocation,
  useNavigate,
} from "@remix-run/react";
import { AuthorizedLayout } from "~/components/AuthorizedLayout/AuthorizedLayout";
import { ProductInterface } from "~/components/Product/Interfaces/ProductInterface";
import { ProductCard } from "~/components/Product/ProductCard/ProductCard";
export const meta: MetaFunction = () => {
  return [
    { title: "Corzhify - Cart" },
    { name: "description", content: "Corzhify - Cart" },
  ];
};

// export const loader = async () => {
//   const products = await fetch("https://fakestoreapi.com/products").then(
//     (res) => res.json()
//   );
//   return products;
// };
export default function CartPage() {
  //   const products: ProductInterface[] = useLoaderData<typeof loader>();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <AuthorizedLayout.Page activePage={location.pathname}>
      <h1>Welcome to the Corzhify Categories</h1>
    </AuthorizedLayout.Page>
  );
}
