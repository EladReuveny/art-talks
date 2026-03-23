export type Picture = {
  id: string;
  title: string;
  description: string;
  artistName: string;
  imgUrl: string;
};

export type CreatePictureDto = Omit<Picture, "id">;

export type UpdatePictureDto = Partial<CreatePictureDto>;
