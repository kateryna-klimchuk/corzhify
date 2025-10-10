import { MetaFunction } from "@remix-run/node";
import {
  Link,
  useLoaderData,
  useLocation,
  useNavigate,
} from "@remix-run/react";
import { AuthorizedLayout } from "~/components/AuthorizedLayout/AuthorizedLayout";
import { Cart } from "~/components/Cart/CartPage/CartPage";
import { Icon } from "~/components/Icon/Icon";
import { CartService } from "~/services/api";

export const meta: MetaFunction = () => {
  return [
    { title: "Corzhify - Cart" },
    { name: "description", content: "Corzhify - Cart" },
  ];
};

export const loader = async () => {
  try {
    // TODO: Change to exact user after auth implemented
    const userId = 2;
    const [carts, userProducts] = await Promise.all([
      CartService.getUserCart(userId),
      CartService.getUserProducts(userId),
    ]);

    return { carts, userProducts };
  } catch (error) {
    console.error("Error loading user products:", error);
    throw new Response("Failed to load cart", { status: 500 });
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
      cartAmount={carts[0].products.length}
    >
      {userProducts ? (
        <Cart products={userProducts} carts={carts} />
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
