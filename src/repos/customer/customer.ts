import { repo } from "../../core";
import { CreateCustomerData, updateCustomerData } from "../../utils";
import { db } from "../../models";

export const createCustomer = ({
  email,
  password,
  phone,
  username,
  ...data
}: CreateCustomerData) =>
  repo(() =>
    db.customers.create({
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
              role: "customer",
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

export const updateCustomerPhoto = (id: number, photo: string) =>
  repo(() =>
    db.customers.update({
      where: { id },
      data: { photo },
    })
  );
export const updateCustomersProfile = (id: number, data: updateCustomerData) =>
  repo(() =>
    db.customers.update({
      where: { id },
      data,
    })
  );

export const findCustomerByPhone = (phone: string) =>
  repo(() =>
    db.customers.findFirst({
      where: {
        user: {
          is: { phone },
        },
      },
      include: { user: { select: { password: false } } },
    })
  );
export const findCustomer = (id: number) =>
  repo(() =>
    db.customers.findUnique({
      where: {
        id,
      },
    })
  );

export const findCustomers = () =>
  repo(() => db.customers.findMany({ include: { user: true } }));
