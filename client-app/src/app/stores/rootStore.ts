import { configure } from "mobx";
import { createContext } from "react";
import CommonStore from "./commonStore";
import FabricStore from "./fabricStore";
import ModalStore from "./modalStore";
import UserStore from "./userStore";

configure({ enforceActions: "always" });

export class RootStore {
  fabricStore: FabricStore;
  userStore: UserStore;
  commonStore: CommonStore;
  modalStore: ModalStore;

  constructor() {
    this.fabricStore = new FabricStore(this);
    this.userStore = new UserStore(this);
    this.commonStore = new CommonStore(this);
    this.modalStore = new ModalStore(this);
  }
}

export const RootStoreContext = createContext(new RootStore());
