export interface IFabric {
  id: string;
  title: string;
  description: string;
  date: Date;
  quantity: number;
  price: number;
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
