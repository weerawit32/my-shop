import { request } from "@/utils/api";

export const productList = async (params: object) => {
  return request("GET", "/products/list", params);
};

export const productDetail = async (params: object) => {
  return request("GET", "/products/detail", params);
};
