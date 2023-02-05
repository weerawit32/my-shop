import { productList } from "@/apis/product";
import { useRequest } from "ahooks";
import { useRouter } from "next/router";
import { useEffect } from "react";

const useProductsService = () => {
  const router = useRouter();
  const currentPage = router.query.p || 1;
  const pageSize = 10;

  const { data, error, loading, run } = useRequest(productList, {
    manual: true,
  });

  useEffect(() => {
    run({
      country: "us",
      lang: "en",
      pageSize,
      currentPage,
    });
  }, [currentPage]);

  // const onPageChange = (page: number) => {
  //   router.push();
  // };

  return {
    items: data,
    error,
    loading,
  };
};

export default useProductsService;
