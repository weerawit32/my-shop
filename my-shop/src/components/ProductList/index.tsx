import { mockData } from "@/MockData";
import Image from "next/image";
import Link from "next/link";
import useProductsService from "@/service/productListService";
import { useRequest } from "ahooks";
import { productList } from "@/apis/product";
import Pagination from "@mui/material/Pagination";

const ProductList = ({ data }: any) => {
  console.log("dataaa", data);
  const {
    items,
    error,
    loading,
    pagination: { current, totalPage },
    onPageChange,
  } = useProductsService();

  if (error || loading) {
    return <></>;
  }
  return (
    <div>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-8">
        {(items || data).map((item: any, index: number) => {
          return <ProductCard key={index} item={item} />;
        })}
      </div>
      <div className="flex justify-center mt-6">
        <Pagination count={totalPage} page={current} onChange={onPageChange} />
      </div>
    </div>
  );
};

export default ProductList;

// export async function getStaticProps() {
//   const { data, error } = useRequest(productList, {
//     defaultParams: [
//       {
//         country: "us",
//         lang: "en",
//         pagesize: 12,
//         currentpage: 1,
//       },
//     ],
//   });
//   console.log("error", error);

//   return {
//     props: {
//       data: data?.results,
//     },
//   };
// }

const ProductCard = ({ item }: any) => {
  const myLoader = ({ src }: any) => {
    return `${item.images[0].baseUrl || ""}`;
  };
  return (
    <Link href={item.articles[0].code}>
      <div className="flex flex-col w-[200px] shadow-lg rounded-lg">
        <Image
          loader={myLoader}
          src={item.images[0].baseUrl || ""}
          alt="picture"
          width={200}
          height={100}
          unoptimized
        />

        <div className="p-3">
          <div className="truncate ...">{item.name}</div>
          <div>{item.price.formattedValue}</div>
        </div>
      </div>
    </Link>
  );
};
