import { MetaFunction } from "@remix-run/node";
import { Link, useLocation, useNavigate } from "@remix-run/react";
import { AuthorizedLayout } from "~/components/AuthorizedLayout/AuthorizedLayout";
import { Cart } from "~/components/Cart/CartPage/CartPage";
import { Icon } from "~/components/Icon/Icon";
import { useCart } from "~/contexts/CartContext";

export const meta: MetaFunction = () => {
  return [
    { title: "Corzhify - Cart" },
    { name: "description", content: "Corzhify - Cart" },
  ];
};

export default function CartPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, getCartItemCount } = useCart();

  return (
    <AuthorizedLayout.Page
      activePage={location.pathname}
      backButton={{ onClick: () => navigate(-1) }}
      cartAmount={getCartItemCount()}
    >
      {cart.products.length > 0 ? (
        <Cart />
      ) : (
        <div className="flex flex-col justify-center items-center gap-4 py-12">
          <Icon.Cart width="160" height="160" strokeWidth={"1"} />
          <p className="text-lg text-slate-600">
            You don't have any products in your cart
          </p>
          <Link
            to={"/products"}
            className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium"
          >
            Start Shopping
          </Link>
        </div>
      )}
    </AuthorizedLayout.Page>
  );
}
