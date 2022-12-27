import {
  Service,
  response,
  notExistError,
  UserData,
  incorrectCredentials,
  generateToken,
  LoginData,
  verifyData,
  resendData,
  invalidParam,
  recoverFilterData,
  resetData,
  locationData,
  databaseError,
} from "../../utils";
import { service } from "../../core";
import bcrypt from "bcrypt";
import {
  addLocation,
  expireToken,
  findToken,
  findUserByEmail,
  findUserByEmailOrPhone,
  findUserById,
  updateToken,
  updateUser,
  updateUserPassword,
} from "../../repos";

export const signInUser: Service<LoginData> = ({ validatedData }) =>
  service(async () => {
    const { email, password } = validatedData;
    const { data: foundUser, error } = await findUserByEmailOrPhone(email);

    if (error) return response.serverError(error);
    if (!foundUser) return response.failed(notExistError("Email or Phone"));
    const match = await bcrypt.compare(password, foundUser.password ?? "");
    if (!match) return response.failed(incorrectCredentials);

    const user = foundUser as UserData;

    const token = await generateToken({
      id: user.id,
      email: user.email,
      username: user.username,
      phone: user.phone,
      verified: user.verified,
    });

    if (!token) return response.serverError();
    return response.success({ user, token });
  });

export const resendUserToken: Service<resendData> = ({ validatedData }) =>
  service(async () => {
    const { email } = validatedData;
    const { data: user, error } = await findUserByEmail(email);

    if (error) return response.serverError(error);
    if (!user) return response.failed(notExistError("email"));
    const token = Math.floor(Math.random() * 984112 + 92124);
    await updateToken(user.id, token);
    // const subject = "Resend Token.";
    // const message = resendToken(user.firstName, link);
    // await sendEmail(email, subject, message);
    return response.success();
  });

export const verifyUserAccount: Service<verifyData> = ({ validatedData }) =>
  service(async () => {
    const { token } = validatedData;
    const { data: userToken, error: tokenError } = await findToken(token);
    if (tokenError) return response.serverError(tokenError);
    if (!userToken) return response.failed(invalidParam("token"));
    const { data: user, error } = await updateUser(userToken.userId);
    const { error: updateError } = await expireToken(userToken.id);

    if (error) return response.serverError(error);
    if (updateError) return response.serverError(updateError);
    if (!user) return response.serverError();

    return response.success(user);
  });

export const recoverUserAccount: Service<resendData> = ({
  filters,
  validatedData,
}) =>
  service(async () => {
    const { type } = filters as recoverFilterData;
    const { email } = validatedData;
    const { data: user, error: userError } = await findUserByEmailOrPhone(
      email
    );
    if (userError) return response.serverError(userError);
    if (!user) return response.failed(notExistError("Email or Phone"));
    const token = Math.floor(Math.random() * 984112 + 92124);

    const { error: updateError } = await updateToken(user.id, token);

    if (updateError) return response.serverError(updateError);
    if (type === "email") {
      // const subject = "Reset Password token";
      // const message = `kindly use this token ${token} to recover your account`;
      // await sendEmail(email, subject, message);
    } else {
      // const message = `kindly use this token ${token} to reset your password.`;
      // await sendSms([user.phone], "vuba app", message);
    }
    return response.success(user);
  });

export const resetUserPassword: Service<resetData> = ({ validatedData }) =>
  service(async () => {
    const { token, password, retypePassword } = validatedData;
    const { data: userToken, error: tokenError } = await findToken(token);
    if (tokenError) return response.serverError(tokenError);
    if (!userToken) return response.failed(invalidParam("token"));
    const { data: user, error } = await findUserById(userToken.userId);
    if (error) return response.serverError(error);
    if (!user) return response.serverError();
    if (password !== retypePassword) {
      return response.failed("Password mismatch.");
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const { error: updateError } = await updateUserPassword(
      user.id,
      hashedPassword
    );

    if (updateError) return response.serverError(updateError);

    return response.success();
  });

export const saveLocation: Service<locationData> = ({ user, validatedData }) =>
  service(async () => {
    const { longitude, latitude, address } = validatedData;
    if (!user || !user.id) return response.serverError();
    const { data: location, error } = await addLocation(
      user.id,
      longitude,
      latitude,
      address
    );
    if (error) return response.serverError(error);

    if (!location) return response.serverError(databaseError);
    return response.success(location);
  });
