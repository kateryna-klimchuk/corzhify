import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Corzhify" },
    { name: "description", content: "Welcome to Corzhify!" },
  ];
};

export default function Index() {
  return (
    <div className="text-orange-500">
      <h1>Welcome to Corzhify</h1>
    </div>
  );
}
