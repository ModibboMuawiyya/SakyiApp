import { observable, action, computed, configure, runInAction } from "mobx";
import { createContext, SyntheticEvent } from "react";
import { IFabric } from "../modules/fabric";
import agent from "../api/agent";

configure({ enforceActions: "always" });

class FabricStore {
  @observable fabricRegistry = new Map();
  @observable fabric: IFabric | null = null;
  @observable loadingInitial = false;
  @observable submitting = false;
  @observable target = "";

  @computed get fabricsByDate() {
    return Array.from(this.fabricRegistry.values()).sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
  }

  @action loadFabrics = async () => {
    this.loadingInitial = true;
    try {
      const fabrics = await agent.Fabrics.list();
      runInAction("loading fabrics", () => {
        fabrics.forEach((fabric) => {
          fabric.date = fabric.date.split(".")[0];
          this.fabricRegistry.set(fabric.id, fabric);
        });
        this.loadingInitial = false;
      });
    } catch (error) {
      runInAction("loading fabrics error", () => {
        console.log(error);
      });
      this.loadingInitial = false;
    }
  };

  @action loadFabric = async (id: string) => {
    let fabric = this.getFabric(id);
    if (fabric) {
      this.fabric = fabric;
    } else {
      this.loadingInitial = true;
      try {
        fabric = await agent.Fabrics.details(id);
        runInAction("getting Fabric", () => {
          this.fabric = fabric;
          this.loadingInitial = false;
        });
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
      runInAction("Creating a fabric", () => {
        this.fabricRegistry.set(fabric.id, fabric);
        this.submitting = false;
      });
    } catch (error) {
      runInAction("Creating Fabric Error", () => {
        this.submitting = false;
      });
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
    } catch (error) {
      runInAction("Editing Fabric Error", () => {
        this.submitting = false;
      });
      console.log(error);
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
}

export default createContext(new FabricStore());
