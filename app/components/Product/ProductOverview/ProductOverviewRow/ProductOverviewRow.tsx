import { Link } from "@remix-run/react";
import { Icon } from "~/components/Icon/Icon";

export interface ProductOverviewRowInterface {
  label: string;
  description: string | number;
  background?: string;
  hasLink?: boolean;
  productId?: number;
}

export const ProductOverviewRow: React.FunctionComponent<
  ProductOverviewRowInterface
> = ({ label, description, background, hasLink, productId }) => {
  return (
    <li className={`grid p-3 text-sm gap-x-2 grid-cols-7 ${background}`}>
      <div className="col-span-2 font-medium text-gray-900">{label}</div>
      <div className={`col-span-5 ${hasLink && "flex items-center gap-2"}`}>
        <pre
          className="whitespace-pre-wrap"
          style={{
            fontFamily: "inherit",
            fontSize: "inherit",
            lineHeight: "inherit",
          }}
        >
          {description}
        </pre>
        {hasLink && productId && (
          <Link to={`/products/${productId}`} className="px-2">
            <Icon.Link className="w-4 h-4 text-blue-400" />
          </Link>
        )}
      </div>
    </li>
  );
};
