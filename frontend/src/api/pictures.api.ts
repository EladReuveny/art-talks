import type {
  CreatePictureDto,
  Picture,
  UpdatePictureDto,
} from "../types/pictures.types";
import { api, API_URL } from "./api.config";

const RESOURCE_PREFIX = `${API_URL}/pictures`;

export const picturesApi = {
  findAll: async (q?: string): Promise<Picture[]> => {
    const { data } = await api.get(`${RESOURCE_PREFIX}`, { params: { q } });
    return data;
  },
  findOne: async (pictureId: string): Promise<Picture> => {
    const { data } = await api.get(`${RESOURCE_PREFIX}/${pictureId}`);
    return data;
  },
  create: async (createPictureDto: CreatePictureDto): Promise<Picture> => {
    const { data } = await api.post(`${RESOURCE_PREFIX}`, createPictureDto);
    return data;
  },
  update: async (
    pictureId: string,
    updatePictureDto: UpdatePictureDto,
  ): Promise<Picture> => {
    const { data } = await api.patch(
      `${RESOURCE_PREFIX}/${pictureId}`,
      updatePictureDto,
    );
    return data;
  },
  remove: async (pictureId: string): Promise<void> => {
    const { data } = await api.delete(`${RESOURCE_PREFIX}/${pictureId}`);
    return data;
  },
};
