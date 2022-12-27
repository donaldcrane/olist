import {
  Service,
  response,
  FileTypes,
  notExistError,
  existError,
  CreateCustomerData,
  updateCustomerData,
  databaseError,
  generateRandomDigits,
} from "../../utils";
import { service } from "../../core";
import {
  findUserByEmailPhoneUsername,
  createCustomer,
  updateCustomersProfile,
  updateCustomerPhoto,
  findCustomer,
  findCustomers,
  createToken,
} from "../../repos";
import bcrypt from "bcrypt";
import { saveUploadedFile } from "../../middlewares";

export const registerCustomer: Service<CreateCustomerData> = ({
  validatedData,
}) =>
  service(async () => {
    const { username, phone, email, password, ...customerData } = validatedData;

    const { data: emailExist, error: emailExistError } =
      await findUserByEmailPhoneUsername(email, phone, username);

    if (emailExistError) return response.serverError(emailExistError);
    if (emailExist) return response.failed(existError("Email or Phone"));
    const { data: customer, error: registrationError } = await createCustomer({
      ...customerData,
      phone,
      username,
      email: email.toLowerCase(),
      password: bcrypt.hashSync(password, 10),
    });
    if (registrationError) return response.failed(registrationError);
    if (!customer) return response.serverError(databaseError);
    const token = generateRandomDigits(6);
    await createToken(customer.user.id, Number(token));
    // const message = `kindly use this token ${token} to reset your password.`;
    // await sendSms([user.phone], "Fair Money", message);
    return response.success(customer);
  });

export const updateCustomerProfile: Service<updateCustomerData> = ({
  validatedData,
  customer,
}) =>
  service(async () => {
    if (!customer?.id) return response.serverError();
    const { id } = customer;
    const { data: customerExist, error: customerExistError } =
      await findCustomer(id);

    if (customerExistError) return response.serverError(customerExistError);
    if (!customerExist) return response.serverError();
    const { data: updatedCustomer, error: updateError } =
      await updateCustomersProfile(id, validatedData);
    if (updateError) return response.failed(updateError);

    return response.success(updatedCustomer);
  });

export const fetchAllCustomers: Service<CreateCustomerData> = () =>
  service(async () => {
    const { data: customers, error: customersError } = await findCustomers();

    if (customersError) return response.serverError(customersError);
    if (!customers) return response.failed(notExistError("customers"));

    return response.success(customers);
  });

export const updateCustomerProfileImage: Service = ({ file, customer }) =>
  service(async () => {
    if (!customer || !customer.id) return response.serverError();
    const { data: imageFile, error: fileError } = await saveUploadedFile(
      file,
      FileTypes.IMAGE
    );
    if (fileError || !imageFile?.url) return response.serverError(fileError);

    const { data, error } = await updateCustomerPhoto(
      customer.id,
      imageFile.url
    );

    if (error || !data) return response.serverError(error);
    return response.success(data);
  });
