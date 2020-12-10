import { IClient, IFabric } from "../../modules/fabric";
import { IUser } from "../../modules/user";

export const combineDateAndTime = (date: Date, time: Date) => {
  const timeString = time.getHours() + ":" + time.getMinutes() + ":00";

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dateString = `${year}-${month}-${day}`;

  return new Date(dateString + " " + timeString);
};

export const convertPriceToInt = (nbr: string) => {
  return new Number(nbr);
};

export const setFabricProps = (fabric: IFabric, user: IUser) => {
  fabric.date = new Date(fabric.date);
  fabric.liked = fabric.clients.some((a) => a.username === user.username);
  fabric.isOwner = fabric.clients.some(
    (a) => a.username === user.username && a.isOwner
  );
  return fabric;
};

export const createClient = (user: IUser): IClient => {
  return {
    displayName: user.displayName,
    isOwner: false,
    username: user.username,
    image: user.image!,
  };
};
