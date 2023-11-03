import axiosInstance from "@/app/lib/axios.config";
import { PostDSO } from "@/data/dso/post.dso";
import { PostDTO } from "@/data/dto/post.dto";
import { postMigration } from "@/data/migrator/post.migration";
import { endpoints } from "@/data/mocks/endpoint";

export const getPostsService = (query: string) => {
    return axiosInstance.get<PostDTO[]>(endpoints.posts(query)).then(res => {
        return res.data.map(postMigration);
    });
};

export const getPostService = (id: number) => {
    return axiosInstance.get<PostDTO>(endpoints.post(id)).then(res => {
        return postMigration(res.data);
    });
};

export const addPostService = (post: PostDSO) => {
    return axiosInstance.post(endpoints.posts(), post).then(res => {
        return res.data;
    });
};

export const deletePostService = (id: number) => {
    return axiosInstance.delete(endpoints.post(id)).then(res => {
        return res.data;
    });
};