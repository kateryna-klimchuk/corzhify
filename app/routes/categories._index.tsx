import { MetaFunction } from "@remix-run/node";
import { Link, useLoaderData, useLocation, useNavigate } from "@remix-run/react";

import { AuthorizedLayout } from "~/components/AuthorizedLayout/AuthorizedLayout";
import { TextUtility } from "~/components/Utilities/TextUtility";
import { useCart } from "~/contexts/CartContext";
import { ProductService } from "~/services/api";

export const meta: MetaFunction = () => {
  return [
    { title: "Corzhify - Categories" },
    { name: "description", content: "Corzhify - Categories" },
  ];
};

interface CategoryWithImages {
  slug: string;
  name: string;
  images: string[];
}

export const loader = async () => {
  try {
    const categories = await ProductService.getCategories();

    // Fetch first 4 products for each category to create collage
    const categoriesWithImages: CategoryWithImages[] = await Promise.all(
      categories.map(async (categorySlug) => {
        try {
          const products = await ProductService.getByCategory(categorySlug);
          const images = products.slice(0, 4).map((p) => p.image);
          return {
            slug: categorySlug,
            name: TextUtility.capitalized(categorySlug.replace(/-/g, " ")),
            images,
          };
        } catch {
          return {
            slug: categorySlug,
            name: TextUtility.capitalized(categorySlug.replace(/-/g, " ")),
            images: [],
          };
        }
      })
    );

    return { categories: categoriesWithImages };
  } catch (error) {
    console.error("Failed to load categories:", error);
    throw new Response("Failed to load categories", { status: 500 });
  }
};

function CategoryCard({ category }: { category: CategoryWithImages }) {
  return (
    <li className="group flex flex-col border rounded-lg border-gray-200 bg-white hover:shadow-card-hover hover:border-primary-300 transition-all duration-300 overflow-hidden">
      <Link to={`/categories/${category.slug}`} className="w-full h-full">
        <div className="w-full h-40 bg-gray-50 overflow-hidden">
          {category.images.length > 0 ? (
            <div className="grid grid-cols-2 grid-rows-2 w-full h-full gap-0.5 p-1">
              {category.images.slice(0, 4).map((image, index) => (
                <div
                  key={index}
                  className="bg-white flex items-center justify-center overflow-hidden rounded"
                >
                  <img
                    src={image}
                    alt=""
                    className="w-full h-full object-contain p-1 group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No images
            </div>
          )}
        </div>
        <div className="p-4 text-center">
          <h3 className="text-sm sm:text-base font-semibold text-slate-800">
            {category.name}
          </h3>
        </div>
      </Link>
    </li>
  );
}

export default function CategoriesPage() {
  const { categories } = useLoaderData<typeof loader>();

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
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </ul>
      </div>
    </AuthorizedLayout.Page>
  );
}
