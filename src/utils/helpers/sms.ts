import axios from "axios";
import config from "../../config";

export const sendSms = async (
  phoneNumbers: string[],
  from: string,
  sms: string
) => {
  const options: object = {
    url: config.SMS_URL,
    method: "POST",
    data: {
      to: phoneNumbers,
      from,
      message: sms,
    },
    headers: { "content-type": "application/json" },
  };
  const abc = await axios.request(options);
  console.log(abc);
};
