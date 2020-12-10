export interface IFabric {
  id: string;
  title: string;
  description: string;
  date: Date;
  quantity: number;
  price: number;
  liked: boolean;
  isOwner: boolean;
  clients: IClient[];
}

export interface IFabricFormValues extends Partial<IFabric> {
  time?: Date;
  quantity: number;
}

export class FabricFormValues implements IFabricFormValues {
  id?: string = undefined;
  title: string = "";
  description: string = "";
  date?: Date = undefined;
  time?: Date = undefined;
  quantity: number = 0;
  price: number = 0;

  constructor(init?: IFabricFormValues) {
    if (init && init.date) {
      init.time = init.date;
    }

    Object.assign(this, init);
  }
}

export interface IClient {
  username: string;
  displayName: string;
  image: string;
  isOwner: boolean;
}
