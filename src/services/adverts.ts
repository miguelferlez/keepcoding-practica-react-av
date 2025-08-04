import { client, setAuthorizationHeader } from "../api/client";
import { AdvertsSchema, type Advert } from "../pages/adverts/types";
import storage from "../utils/storage";

const ADVERTS_URL = "/api/v1/adverts";

export const getAdverts = async () => {
  const url = ADVERTS_URL;
  const response = await client.get<Advert>(url);
  const accessToken = storage.get("auth");

  if (accessToken) {
    setAuthorizationHeader(accessToken);
  }

  return AdvertsSchema.parse(response.data);
};

export const getAdvertsTags = async () => {
  const url = `${ADVERTS_URL}/tags`;
  const response = await client.get<Array<string>>(url);

  return response.data;
};

export const getAdvertById = async (advertId: string) => {
  const url = `${ADVERTS_URL}/${advertId}`;
  const response = await client.get<Advert>(url);
  const accessToken = storage.get("auth");

  if (accessToken) {
    setAuthorizationHeader(accessToken);
  }

  return response.data;
};

export const createAdvert = async (advert: {
  name: string;
  sale: boolean;
  price: number;
  tags: string[];
  photo: File | undefined;
}) => {
  const url = ADVERTS_URL;
  const response = await client.post<Advert>(
    url,
    {
      name: advert.name,
      sale: advert.sale,
      price: advert.price,
      tags: advert.tags,
      photo: advert.photo,
    },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return response.data;
};

export const deleteAdvert = async (advertId: string) => {
  const url = `${ADVERTS_URL}/${advertId}`;
  const response = await client.delete<Advert>(url);
  const accessToken = storage.get("auth");

  if (accessToken) {
    setAuthorizationHeader(accessToken);
  }

  return response.data;
};
