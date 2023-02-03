import { mockData } from "@/MockData";
import Image from "next/image";

const ProductList = () => {
  return (
    <div className="grid">
      {mockData.results.map((item: any, index: number) => {
        return <ProductCard key={index} item={item} />;
      })}
    </div>
  );
};

export default ProductList;

const ProductCard = ({ item }: any) => {
  const myLoader = ({ src }: any) => {
    return;
  };
  return (
    <div className="flex flex-col w-[100px]">
      <div>
        {/* <img
          src={item.images[0].baseUrl || ""}
          alt="picture"
          style={{ height: "200px", width: "150px" }}
        ></img> */}
        <Image
          src={item.images[0].baseUrl || ""}
          alt="picture"
          width={100}
          height={100}
        />
      </div>
      <div>
        <div>{item.name}</div>
        <div>{item.price.formattedValue}</div>
      </div>
    </div>
  );
};
