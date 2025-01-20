export interface ProductOverviewRowInterface {
  label: string;
  description: string | number;
  background?: string;
}

export const ProductOverviewRow: React.FunctionComponent<
  ProductOverviewRowInterface
> = ({ label, description, background }) => {
  return (
    <li className={`grid p-3 text-sm gap-x-2 grid-cols-7 ${background}`}>
      <div className="col-span-2 font-medium text-gray-900">{label}</div>
      <div className="col-span-5">
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
      </div>
    </li>
  );
};
