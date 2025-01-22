import { MetaFunction } from "@remix-run/node";
import {
  Link,
  useLoaderData,
  useLocation,
  useNavigate,
} from "@remix-run/react";
import { AuthorizedLayout } from "~/components/AuthorizedLayout/AuthorizedLayout";
import { Cart } from "~/components/Cart/Cart";
import { Icon } from "~/components/Icon/Icon";
import { ProductCard } from "~/components/Product/ProductCard/ProductCard";
export const meta: MetaFunction = () => {
  return [
    { title: "Corzhify - Cart" },
    { name: "description", content: "Corzhify - Cart" },
  ];
};

export type ProductInterface = {
  id: number;
  title: string;
  image: string;
  price: number;
  category: string;
  rating: { rate: number; count: number };
  description: string;
} | null;

export const loader = async () => {
  try {
    // Fetch user carts from random user
    // TODO: Change to exact user after auth implemented
    const carts = await fetch("https://fakestoreapi.com/carts/user/2").then(
      (res) => res.json()
    );

    //   TODO: Replace this function to Product service/class

    const getUserProducts = async () => {
      const productPromises = carts[0].products.map(
        (product: { productId: number }) =>
          fetch(`https://fakestoreapi.com/products/${product.productId}`).then(
            (res) => res.json()
          )
      );
      const userProducts = await Promise.all(productPromises);
      return userProducts;
    };

    const userProducts = await getUserProducts();

    // TODO: Check, if I need carts array

    return { carts, userProducts };
  } catch (error) {
    console.error("Error loading user products:", error);
    throw new Error("Failed to load user products.");
  }
};

export default function CartPage() {
  const { carts, userProducts } = useLoaderData<typeof loader>();
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <AuthorizedLayout.Page
      activePage={location.pathname}
      backButton={{ onClick: () => navigate(-1) }}
    >
      {userProducts ? (
        <ul className="grid gap-2">
          {userProducts.map((product, index) => {
            return <Cart key={index} product={product} />;
          })}
        </ul>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <Icon.Cart width="160" height="160" strokeWidth={"1"} />
          <p>You don't have any products in your cart</p>
          <Link to={"/products"} className="text-blue-500">
            Visit our products to start shopping!
          </Link>
        </div>
      )}
    </AuthorizedLayout.Page>
  );
}
