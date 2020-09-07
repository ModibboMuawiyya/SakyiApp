import { observable, action, computed, configure, runInAction } from "mobx";
import { createContext, SyntheticEvent } from "react";
import { IFabric } from "../modules/fabric";
import agent from "../api/agent";

configure({ enforceActions: "always" });

class FabricStore {
  @observable fabricRegistry = new Map();
  @observable fabrics: IFabric[] = [];
  @observable selectedFabric: IFabric | undefined;
  @observable loadingInitial = false;
  @observable editMode = false;
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

  @action selectFabric = (id: string) => {
    this.selectedFabric = this.fabricRegistry.get(id);
    this.editMode = false;
  };

  @action createFabric = async (fabric: IFabric) => {
    this.submitting = true;
    try {
      await agent.Fabrics.create(fabric);
      runInAction("Creating a fabric", () => {
        this.fabricRegistry.set(fabric.id, fabric);
        this.editMode = false;
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
        this.selectedFabric = fabric;
        this.editMode = false;
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

  @action openCreateForm = () => {
    this.editMode = true;
    this.selectedFabric = undefined;
  };

  @action openEditForm = (id: string) => {
    this.selectedFabric = this.fabricRegistry.get(id);
    this.editMode = true;
  };

  @action cancelSelectedFabric = () => {
    this.selectedFabric = undefined;
  };

  @action cancelFormOpen = () => {
    this.editMode = false;
  };
}

export default createContext(new FabricStore());
