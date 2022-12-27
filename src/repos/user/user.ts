import { repo } from "../../core";
import { db } from "../../models";

export const findCustomerByEmail = (email: string) =>
  repo(() =>
    db.customers.findFirst({
      where: {
        user: {
          is: { email },
        },
      },
      include: { user: { select: { password: false } } },
    })
  );
export const findUserByEmail = (email: string) =>
  repo(() =>
    db.users.findFirst({
      where: {
        email,
      },
      include: { seller: true, customer: true },
    })
  );

export const findToken = (token: number) =>
  repo(() =>
    db.otps.findFirst({
      where: { token },
    })
  );

export const updateToken = (id: number, token: number) =>
  repo(() =>
    db.otps.upsert({
      where: { userId: id },
      create: { userId: id, token },
      update: { token },
    })
  );

export const updateUser = (id: number) =>
  repo(() =>
    db.users.update({
      where: { id },
      data: { verified: true },
    })
  );

export const updateUserPassword = (id: number, password: string) =>
  repo(() =>
    db.users.update({
      where: { id },
      data: { password },
    })
  );

export const expireToken = (id: number) =>
  repo(() =>
    db.otps.update({
      where: { id },
      data: { expired: false },
    })
  );
export const createToken = (id: number, token: number) =>
  repo(() =>
    db.otps.create({
      data: { userId: id, token },
    })
  );

export const findUserById = (id: number) =>
  repo(() =>
    db.users.findUnique({
      where: {
        id,
      },
    })
  );

export const findUserByEmailOrPhone = (email: string) =>
  repo(() =>
    db.users.findFirst({
      where: { OR: [{ phone: email }, { email }] },
      include: { customer: true, seller: true },
    })
  );

export const findUserByEmailPhoneUsername = (
  email: string,
  phone: string,
  username: string
) =>
  repo(() =>
    db.users.findFirst({
      where: { OR: [{ phone }, { email }, { username }] },
    })
  );

export const addLocation = (
  id: number,
  longitude: string,
  latitude: string,
  address: string
) =>
  repo(() =>
    db.location.upsert({
      where: { userId: id },
      create: { userId: id, longitude, latitude, address },
      update: { longitude, latitude, address },
      include: { user: true },
    })
  );
