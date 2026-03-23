import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { picturesApi } from "../../api/pictures.api";
import type {
  CreatePictureDto,
  Picture,
  UpdatePictureDto,
} from "../../types/pictures.types";
import { picturesKeys } from "./pictures.keys";

export const picturesMutations = {
  useCreate: async () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (createPictureDto: CreatePictureDto) =>
        picturesApi.create(createPictureDto),
      onSuccess: (data: Picture) => {
        queryClient.setQueryData(
          picturesKeys.base(),
          (prev: Picture[] = []) => [...prev, data],
        );
        queryClient.invalidateQueries({
          queryKey: picturesKeys.base(),
        });
      },
      onError: (err: Error) => {
        console.error(err);
        toast.error(err.message);
      },
    });
  },
  useUpdate: async () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({
        pictureId,
        updatePictureDto,
      }: {
        pictureId: string;
        updatePictureDto: UpdatePictureDto;
      }) => picturesApi.update(pictureId, updatePictureDto),
      onSuccess: (data: Picture) => {
        queryClient.setQueryData(picturesKeys.detail(data.id), data);
        queryClient.invalidateQueries({
          queryKey: picturesKeys.base(),
        });
      },
    });
  },
  useRemove: async () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (pictureId: string) => picturesApi.remove(pictureId),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: picturesKeys.base(),
        });
      },
    });
  },
};
