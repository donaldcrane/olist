import {
  Service,
  response,
  FileTypes,
  notExistError,
  existError,
  CreateSellerData,
  updateSellerData,
  generateRandomDigits,
  databaseError,
  documentData,
} from "../../utils";
import { service } from "../../core";
import {
  findUserByEmailPhoneUsername,
  createSeller,
  updateSellersProfile,
  updateSellerPhoto,
  findSellers,
  findSeller,
  createToken,
  addDocument,
} from "../../repos";
import bcrypt from "bcrypt";
import { saveUploadedFile } from "../../middlewares";

export const registerSeller: Service<CreateSellerData> = ({ validatedData }) =>
  service(async () => {
    const { username, phone, email, password, ...sellerData } = validatedData;

    const { data: emailExist, error: emailExistError } =
      await findUserByEmailPhoneUsername(email, phone, username);

    if (emailExistError) return response.serverError(emailExistError);
    if (emailExist) return response.failed(existError("Email or Phone"));
    const { data: seller, error: registrationError } = await createSeller({
      ...sellerData,
      phone,
      username,
      email: email.toLowerCase(),
      password: bcrypt.hashSync(password, 10),
    });
    if (registrationError) return response.failed(registrationError);
    if (!seller) return response.serverError(databaseError);
    const token = generateRandomDigits(6);
    await createToken(seller.user.id, Number(token));
    // const message = `kindly use this token ${token} to reset your password.`;
    // await sendSms([user.phone], "Fair Money", message);
    return response.success(seller);
  });

export const updateSellerProfile: Service<updateSellerData> = ({
  validatedData,
  seller,
}) =>
  service(async () => {
    if (!seller?.id) return response.serverError();
    const { id } = seller;
    const { data: customerExist, error: customerExistError } = await findSeller(
      id
    );

    if (customerExistError) return response.serverError(customerExistError);
    if (!customerExist) return response.serverError();
    const { data: updatedSeller, error: updateError } =
      await updateSellersProfile(id, validatedData);
    if (updateError) return response.failed(updateError);

    return response.success(updatedSeller);
  });

export const fetchAllSeller: Service<CreateSellerData> = () =>
  service(async () => {
    const { data: sellers, error: sellersError } = await findSellers();

    if (sellersError) return response.serverError(sellersError);
    if (!sellers) return response.failed(notExistError("seller"));

    return response.success(sellers);
  });

export const updateSellerProfileImage: Service = ({ file, seller }) =>
  service(async () => {
    if (!seller || !seller.id) return response.serverError();
    const { data: imageFile, error: fileError } = await saveUploadedFile(
      file,
      FileTypes.IMAGE
    );
    if (fileError || !imageFile?.url) return response.serverError(fileError);

    const { data, error } = await updateSellerPhoto(seller.id, imageFile.url);

    if (error || !data) return response.serverError(error);
    return response.success(data);
  });

export const saveDocument: Service<documentData> = ({
  validatedData,
  seller,
}) =>
  service(async () => {
    if (!seller || !seller.id) return response.serverError();
    const data = {
      name: validatedData.name,
      sellerId: seller.id,
      fileId: validatedData.fileId,
    };
    const { data: location, error } = await addDocument(data);
    if (error) return response.serverError(error);

    return response.success(location);
  });
