import AES from "crypto-js/aes";
import { enc } from "crypto-js";
import { AccTypes, Messages } from "@/types";

export const convertSecToAudioTimeStamp = (totalSecs: number): string => {
  if (!Number.isFinite(totalSecs) || totalSecs <= 0) return "0:00";

  // if totalSecs is over 3600 === render in hours format e.g 02:01:56
  if (totalSecs >= 3600) {
    const hrs = totalSecs / 3600;
    const rem_hrs = totalSecs % 3600;
    const mins = rem_hrs / 60;
    const secs = rem_hrs % 60;

    return `${Math.floor(hrs).toString()}:${Math.floor(mins)
      .toString()
      .padStart(2, "0")}:${Math.floor(secs).toString().padStart(2, "0")}`;
  }

  //render in minutes e.g 35:01
  const durationMaths = `${Math.floor(totalSecs / 60)}:${Math.floor(
    totalSecs % 60
  )
    .toString()
    .padStart(2, "0")}`;

  return durationMaths;
};

export const widthCalc = (currentTime: number) => {
  //   const result = currentTime / 60;
  //   console.log(result, Math.floor(currentTime * 100));

  return Math.floor((currentTime / 60) * 100);
};

export const decryptId = (str: string) => {
  if (str) {
    const decodedStr = decodeURIComponent(str);
    return AES.decrypt(decodedStr, process.env.NEXT_PUBLIC_HASH!).toString(
      enc.Utf8
    );
  }
};

export const encryptId = (str: string) => {
  const encryptedString = AES.encrypt(str, process.env.NEXT_PUBLIC_HASH!);
  return encodeURIComponent(encryptedString.toString());
};

export const groupDates = (data: Messages[]) => {
  if (data.length === 0) return [];
  const batchGroupTimestamp = data.reduce((acc: AccTypes, cur, i) => {
    const date = new Date(`${cur.sentAt}`);
    const str = +new Date(date.getFullYear(), date.getMonth(), date.getDate());

    if (!acc[str]) {
      acc[str] = [cur];
    } else {
      acc[str] = [...acc[str], cur];
    }

    return acc;
  }, {});
  /// group dates into  millseconds and its data that falls inot that category

  return Object.entries(batchGroupTimestamp)
    .map((item) => ({
      date: Number(item[0]),
      value: item[1],
    }))
    .sort((a, b) => a.date - b.date);
};

export const monthsList: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function convertTo12HourFormat(time: string): string {
  const [hours, minutes] = time.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const adjustedHours = hours % 12 || 12; // Convert 0 to 12 for midnight and adjust other hours
  return `${adjustedHours}:${minutes < 10 ? "0" + minutes : minutes} ${period}`;
}

export function generateRandomString() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;

  for (let i = 0; i < 10; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}
