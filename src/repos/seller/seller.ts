import { repo } from "../../core";
import {
  CreateSellerData,
  createDocumentData,
  updateSellerData,
} from "../../utils";
import { db } from "../../models";

export const createSeller = ({
  email,
  password,
  phone,
  username,
  ...data
}: CreateSellerData) =>
  repo(() =>
    db.sellers.create({
      data: {
        ...data,
        user: {
          connectOrCreate: {
            where: { email },
            create: {
              email,
              password,
              phone,
              username,
              role: "seller",
            },
          },
        },
      },
      include: {
        user: {
          select: { id: true, email: true, username: true, phone: true },
        },
      },
    })
  );

export const updateSellerPhoto = (id: number, photo: string) =>
  repo(() =>
    db.sellers.update({
      where: { id },
      data: { photo },
    })
  );
export const updateSellersProfile = (id: number, data: updateSellerData) =>
  repo(() =>
    db.sellers.update({
      where: { id },
      data,
    })
  );

export const findSellerByPhone = (phone: string) =>
  repo(() =>
    db.sellers.findFirst({
      where: {
        user: {
          is: { phone },
        },
      },
      include: { user: { select: { password: false } } },
    })
  );
export const findSeller = (id: number) =>
  repo(() =>
    db.sellers.findUnique({
      where: {
        id,
      },
    })
  );

export const findSellers = () =>
  repo(() =>
    db.sellers.findMany({
      include: { user: true },
    })
  );

export const addDocument = (data: createDocumentData) =>
  repo(() =>
    db.document.create({
      data,
      include: { file: true },
    })
  );
