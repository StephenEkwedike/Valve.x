import { BigNumber, utils } from "ethers";
import { ZERO } from "config/constants";
import moment from "moment";
import { TransferStatus } from "./enums";

const { formatUnits } = utils;

export const formatCommissionRate = (value?: BigNumber) => {
  return formatBigNumber(value || ZERO, 1, 1) + "%";
};

export const rawCommissionRate = (percentage: string) => {
  return Math.floor(Number(percentage) * 10);
};

export const shortenAddress = (address: string) => {
  return `${address.substring(0, 6)}...${address.substring(
    address.length - 4
  )}`;
};

export const numberWithCommas = (x: number | string) => {
  const splits = x.toString().split(".");
  const first = splits[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  if (splits.length === 1) return first;
  return [first, splits[1]].join(".");
};
export const formatBigNumber = (
  value: BigNumber,
  decimals: number,
  precision = 2
): string =>
  Number(formatUnits(value, decimals)) < 0.01 &&
  Number(formatUnits(value, decimals)) !== 0
    ? Number(formatUnits(value, decimals)).toFixed(precision).toString()
    : Number(formatUnits(value, decimals)).toFixed(2).toString();

export const hideInsignificantZeros = (x: string) => {
  const splits = x.toString().split(".");
  if (splits.length === 1) {
    return x;
  }
  let right = splits[1];

  while (right.length > 0 && right.charAt(right.length - 1) === "0") {
    right = right.substr(0, right.length - 1);
  }
  if (right.length === 0) {
    return splits[0];
  }
  return [splits[0], right].join(".");
};

export const displayLargeAmounts = (amount: string) => {
  const num = parseInt(amount);
  if (num > 999 && num < 1000000) {
    return (num / 1000).toFixed(1) + "K";
  } else if (num >= 1000000) {
    return (
      (num / 1000000)
        .toFixed(1)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "M"
    );
  } else if (num < 900) {
    return num;
  }
};

export const waitSeconds = (sec: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, sec * 1000);
  });

export const formatSeconds = (secs: number) => {
  const res = [];

  const sec = secs % 60;

  const mins = Math.floor(secs / 60);

  if (sec > 0 || mins === 0) res.push(`${sec}s`);

  if (mins > 0) {
    const min = mins % 60;
    if (min > 0) res.push(`${min}m`);

    const hours = Math.floor(mins / 60);
    if (hours > 0) {
      const hour = hours % 24;
      if (hour > 0) res.push(`${hour}h`);

      const days = Math.floor(hours / 24);

      if (days > 0) {
        if (days % 7 === 0 && days >= 7) {
          res.push(`${days / 7}w`);
        } else {
          const year = Math.floor(days / 365);
          const remainingDays = days % 365;
          const month = Math.floor(remainingDays / 30);
          const day = remainingDays % 30;
          res.push(`${day}d`);
          if (month > 0) {
            res.push(`${month}M`);
          }
          if (year > 0) {
            res.push(`${year}Y`);
          }
        }
      }
    }
  }

  return res.reverse().join(":");
};

export const getCurrentTimestamp = () => Math.floor(Date.now() / 1000);

export const isValidUrl = (url: string) => {
  const expression =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
  return url.match(expression);
};

export const getTimeStr = (timestamp: number) => {
  const obj = moment.unix(timestamp);
  return obj.format("MM/DD/YYYY HH:mm:ss");
};

export const getDateStr = (timestamp: number) => {
  const obj = moment.unix(timestamp);
  return obj.format("MM/DD/YYYY");
};

export const getTransferStatus = (status: string) => {
  switch (status) {
    case "Init":
      return TransferStatus.Init;
    case "Sent":
      return TransferStatus.Sent;
    case "Cancelled":
      return TransferStatus.Cancelled;
  }

  return TransferStatus.Init;
}
