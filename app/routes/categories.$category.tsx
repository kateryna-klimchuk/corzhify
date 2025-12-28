import {
  MetaFunction,
  useLoaderData,
  useLocation,
  useNavigate,
} from "@remix-run/react";
import { AuthorizedLayout } from "../components/AuthorizedLayout/AuthorizedLayout";
import { LoaderFunctionArgs } from "@remix-run/node";
import { ProductCard } from "~/components/Product/ProductCard/ProductCard";
import { TextUtility } from "~/components/Utilities/TextUtility";
import { useCart } from "~/contexts/CartContext";
import { ProductService } from "~/services/api";

export const meta: MetaFunction = () => {
  return [
    { title: "Corzhify - Category products" },
    { name: "description", content: "Corzhify - Category products" },
  ];
};
export const loader = async ({ params }: LoaderFunctionArgs) => {
  const category = params.category;
  if (!category) {
    throw new Response("Category not specified", { status: 400 });
  }
  try {
    const categoryProducts = await ProductService.getByCategory(category);
    return { categoryProducts };
  } catch (error) {
    console.error("Failed to load category products:", error);
    throw new Response("Products Not Found", { status: 404 });
  }
};

export default function CategoryPage() {
  const { categoryProducts } = useLoaderData<typeof loader>();

  const location = useLocation();
  const navigate = useNavigate();
  const { getCartItemCount } = useCart();

  const url = location.pathname.split("/").pop();

  const decodedString = TextUtility.decodedString(url as string);

  const subtitle = TextUtility.capitalized(decodedString);

  return (
    <AuthorizedLayout.Page
      activePage={location.pathname}
      backButton={{ onClick: () => navigate(-1) }}
      subTitle={`Category: ${subtitle}`}
      cartAmount={getCartItemCount()}
    >
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoryProducts.map((product) => {
          return (
            <ProductCard
              key={product.id}
              product={{
                id: product.id,
                title: product.title,
                image: product.image,
                href: `/products/${product.id}`,
                price: product.price,
              }}
            />
          );
        })}
      </ul>
    </AuthorizedLayout.Page>
  );
}
