import { observable, action, computed, runInAction } from "mobx";
import { SyntheticEvent } from "react";
import { IFabric } from "../modules/fabric";
import agent from "../api/agent";
import { history } from "../..";
import { toast } from "react-toastify";
import { RootStore } from "./rootStore";
import { createClient, setFabricProps } from "../common/util/util";
import { act } from "react-dom/test-utils";

export default class FabricStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable fabricRegistry = new Map();
  @observable fabric: IFabric | null = null;
  @observable loadingInitial = false;
  @observable submitting = false;
  @observable target = "";
  @observable loading = false;

  @computed get fabricsByDate() {
    return this.groupFabricsByDate(Array.from(this.fabricRegistry.values()));
  }

  groupFabricsByDate(fabrics: IFabric[]) {
    const sortedFabrics = fabrics.sort(
      (a, b) => a.date.getTime() - b.date.getTime()
    );
    // const sortF = sortedFabrics.sort((a, b) => a.price - b.price);
    return Object.entries(
      sortedFabrics.reduce((fabrics, fabric) => {
        const date = fabric.date.toISOString().split("T")[0];
        fabrics[date] = fabrics[date] ? [...fabrics[date], fabric] : [fabric];
        return fabrics;
      }, {} as { [key: string]: IFabric[] })
    );
  }

  @action loadFabrics = async () => {
    this.loadingInitial = true;

    try {
      const fabrics = await agent.Fabrics.list();
      runInAction("loading fabrics", () => {
        fabrics.forEach((fabric) => {
          setFabricProps(fabric, this.rootStore.userStore.user!);
          this.fabricRegistry.set(fabric.id, fabric);
        });
        this.loadingInitial = false;
      });
    } catch (error) {
      runInAction("loading fabrics error", () => {
        console.log(error);
        this.loadingInitial = false;
      });
    }
  };

  @action loadFabric = async (id: string) => {
    let fabric = this.getFabric(id);
    if (fabric) {
      this.fabric = fabric;
      return fabric;
    } else {
      this.loadingInitial = true;
      try {
        fabric = await agent.Fabrics.details(id);
        runInAction("getting Fabric", () => {
          setFabricProps(fabric, this.rootStore.userStore.user!);
          this.fabric = fabric;
          this.fabricRegistry.set(fabric.id, fabric);
          this.loadingInitial = false;
        });
        return fabric;
      } catch (error) {
        runInAction("getting Fabric Error", () => {
          this.loadingInitial = false;
        });
        console.log(error);
      }
    }
  };

  @action clearFabric = () => {
    this.fabric = null;
  };

  getFabric = (id: string) => {
    return this.fabricRegistry.get(id);
  };

  @action selectFabric = (id: string) => {
    this.fabric = this.fabricRegistry.get(id);
  };

  @action createFabric = async (fabric: IFabric) => {
    this.submitting = true;
    try {
      await agent.Fabrics.create(fabric);
      const client = createClient(this.rootStore.userStore.user!);
      client.isOwner = true;
      let clients = [];
      clients.push(client);
      fabric.clients = clients;
      runInAction("Creating a fabric", () => {
        this.fabricRegistry.set(fabric.id, fabric);
        this.submitting = false;
      });
      history.push(`/fabrics/${fabric.id}`);
    } catch (error) {
      runInAction("Creating Fabric Error", () => {
        this.submitting = false;
      });
      toast.error("Problem Submitting Data");
      console.log(error);
    }
  };

  @action editFabric = async (fabric: IFabric) => {
    this.submitting = true;
    try {
      await agent.Fabrics.update(fabric);
      runInAction("Editing Fabric", () => {
        this.fabricRegistry.set(fabric.id, fabric);
        this.fabric = fabric;
        this.submitting = false;
      });
      history.push(`/fabrics/${fabric.id}`);
    } catch (error) {
      runInAction("Editing Fabric Error", () => {
        this.submitting = false;
      });
      toast.error("Problem Submitting Data");
      console.log(error.response);
    }
  };

  @action deleteFabric = async (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    this.submitting = true;
    this.target = event.currentTarget.name;

    try {
      await agent.Fabrics.delete(id);
      runInAction("Deleting Fabric", () => {
        this.fabricRegistry.delete(id);
        this.submitting = false;
      });
    } catch (error) {
      runInAction("Deleting Fabric Error", () => {
        this.submitting = false;
        this.target = "";
      });
      console.log(error);
    }
  };

  @action likeFabric = async () => {
    const client = createClient(this.rootStore.userStore.user!);
    this.loading = true;
    try {
      await agent.Fabrics.like(this.fabric!.id);
      runInAction(() => {
        if (this.fabric) {
          this.fabric.clients.push(client);
          this.fabric.liked = true;
          this.fabricRegistry.set(this.fabric.id, this.fabric);
          this.loading = false;
        }
      });
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });
      toast.error("Problem Liking Fabric");
    }
  };

  @action unlikeFabric = async () => {
    this.loading = true;
    try {
      await agent.Fabrics.unlike(this.fabric!.id);

      runInAction(() => {
        if (this.fabric) {
          this.fabric.clients = this.fabric.clients.filter(
            (a) => a.username !== this.rootStore.userStore.user!.username
          );
          this.fabric.liked = false;
          this.fabricRegistry.set(this.fabric.id, this.fabric);
          this.loading = false;
        }
      });
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });
      toast.error("Problem UnLiking Fabric");
    }
  };
}
