import { useRequest } from "ahooks";
import { useEffect } from "react";
import { productDetail } from "@/apis/product";

const useProductDetail = (id: any) => {
  const { data, error, loading, run } = useRequest(productDetail, {
    manual: true,
  });

  useEffect(() => {
    if (id) {
      run({ lang: "en", country: "us", productcode: id });
    }
  }, [id]);

  return {
    item: data?.product || {},
    loading,
    error,
  };
};

export default useProductDetail;
