import { unknownDatabaseError } from "../utils";

export const repo = async <T = unknown>(
  func: () => Promise<T | undefined>
): Promise<{ data?: T; error?: string }> => {
  try {
    return { data: await func() };
  } catch (e: unknown) {
    console.log(e)
    // console.error("database error");

    const error = unknownDatabaseError;
    // console.error(error);

    return { error };
  }
};
