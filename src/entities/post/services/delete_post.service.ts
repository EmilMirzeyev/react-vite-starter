import axiosInstance from "@/app/lib/axios.config.ts";
import {endpoints} from "@/data/utils/endpoints.ts";

export const deletePostService = async (id: number) => {
  const res = await axiosInstance.delete(endpoints.post(id));
  return res.data;
};