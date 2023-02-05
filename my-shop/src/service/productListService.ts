import { productList } from "@/apis/product";
import { useRequest } from "ahooks";
import { useRouter } from "next/router";
import { useEffect } from "react";

const useProductsService = () => {
  const router = useRouter();
  const currentPage = router.query.p || 1;
  const pageSize = 12;

  const { data, error, loading, run } = useRequest(productList, {
    manual: true,
  });

  useEffect(() => {
    run({
      country: "us",
      lang: "en",
      pagesize: pageSize,
      currentpage: currentPage,
    });
  }, [currentPage]);

  // console.log("data", data);

  const onPageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    router.push(`${router.pathname}?p=${page}`);
    // router.push({`/${router.pathname}`});
  };

  console.log("data", data?.pagination);

  return {
    items: data?.results || [],
    error,
    loading,
    pagination: {
      current: data?.pagination?.currentPage || currentPage,
      totalPage: 20,
    },
    onPageChange,
  };
};

export default useProductsService;
