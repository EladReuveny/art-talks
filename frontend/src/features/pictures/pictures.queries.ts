import { useQuery } from "@tanstack/react-query";
import { picturesApi } from "../../api/pictures.api";
import { picturesKeys } from "./pictures.keys";

export const picturesQueries = {
  useFindAll: (q?: string) =>
    useQuery({
      queryKey: picturesKeys.all(q),
      queryFn: () => picturesApi.findAll(q),
    }),
  useFindOne: (pictureId: string) =>
    useQuery({
      queryKey: picturesKeys.detail(pictureId),
      queryFn: () => picturesApi.findOne(pictureId),
      enabled: !!pictureId,
    }),
};
