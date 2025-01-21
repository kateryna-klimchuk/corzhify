import {
  MetaFunction,
  useLoaderData,
  useLocation,
  useNavigate,
} from "@remix-run/react";
import { ProductInterface } from "../components/Product/Interfaces/ProductInterface";
import { AuthorizedLayout } from "../components/AuthorizedLayout/AuthorizedLayout";
import { LoaderFunctionArgs } from "@remix-run/node";
import { ProductCard } from "~/components/Product/ProductCard/ProductCard";
import { TextUtility } from "~/components/Utilities/TextUtility";

export const meta: MetaFunction = () => {
  return [
    { title: "Corzhify - Category products" },
    { name: "description", content: "Corzhify - Category products" },
  ];
};
export const loader = async ({ params }: LoaderFunctionArgs) => {
  const category = params.category;
  const categoryProducts = await fetch(
    `https://fakestoreapi.com/products/category/${category}`
  ).then((res) => res.json());

  if (!categoryProducts) {
    throw new Response("Products Not Found", { status: 404 });
  }
  return categoryProducts;
};

export default function CategoryPage() {
  const categoryProducts: ProductInterface[] = useLoaderData();

  const location = useLocation();
  const navigate = useNavigate();

  const url = location.pathname.split("/").pop();

  const decodedString = TextUtility.decodedString(url as string);

  const subtitle = TextUtility.capitalized(decodedString);

  return (
    <AuthorizedLayout.Page
      activePage={location.pathname}
      backButton={{ onClick: () => navigate(-1) }}
      subTitle={`Category: ${subtitle}`}
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
