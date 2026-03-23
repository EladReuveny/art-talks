export const picturesKeys = {
  base: () => ["pictures"],
  all: (q?: string) => [...picturesKeys.base(), q],
  detail: (id: string) => [...picturesKeys.base(), id],
} as const;
