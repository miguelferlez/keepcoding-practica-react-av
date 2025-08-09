import { z } from "zod";

export const AdvertSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  name: z.string(),
  sale: z.boolean(),
  price: z.number(),
  tags: z.array(z.string()),
  photo: z.string().nullable(),
});

export type Advert = z.infer<typeof AdvertSchema>;

export type CreateAdvertDto = Pick<
  Advert,
  "name" | "price" | "tags" | "sale"
> & {
  photo?: File;
};

export const AdvertsSchema = z.array(AdvertSchema);

export const FilterSchema = z.object({
  name: z.string().optional(),
  sale: z.boolean().optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  tags: z.array(z.string()).optional(),
});

export type Filter = z.infer<typeof FilterSchema>;
