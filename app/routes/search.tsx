// TODO: Improve search functionality
// - Add filters (price range, category, rating)
// - Add sorting options (price, name, popularity)
// - Implement search suggestions/autocomplete
// - Add search history
// - Improve search algorithm with fuzzy matching

import { MetaFunction } from "@remix-run/node";
import { useLocation, useNavigate } from "@remix-run/react";
import { AuthorizedLayout } from "~/components/AuthorizedLayout/AuthorizedLayout";
import { useCart } from "~/contexts/CartContext";
import { Icon } from "~/components/Icon/Icon";

export const meta: MetaFunction = () => {
  return [
    { title: "Search - Corzhify" },
    { name: "description", content: "Search for products on Corzhify" },
  ];
};

export default function SearchPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { getCartItemCount } = useCart();

  return (
    <AuthorizedLayout.Page
      activePage={location.pathname}
      backButton={{ onClick: () => navigate(-1) }}
      cartAmount={getCartItemCount()}
    >
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-gray-100 mb-6">
          Search Products
        </h1>

        <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <Icon.Search className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
          <h2 className="text-xl font-semibold text-slate-700 dark:text-gray-300 mb-2">
            Coming Soon
          </h2>
          <p className="text-slate-500 dark:text-gray-400">
            Search functionality is currently under development
          </p>
        </div>
      </div>
    </AuthorizedLayout.Page>
  );
}
