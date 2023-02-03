import ProductList from "@/components/ProductList";

export default function Home() {
  console.log(process.env.NEXT_PUBLIC_FIREBASE_API_KEY);
  return (
    <>
      <div className="flex">
        <div className="m-2">abc</div>
        <div>aabc</div>
      </div>
      <ProductList />
    </>
  );
}
