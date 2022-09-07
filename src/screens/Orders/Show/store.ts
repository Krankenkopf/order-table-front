import { makeAutoObservable } from "mobx";
import client from "~/api/gql";
import { SingleOrder } from "~/screens/Orders/Show/types";
import { ORDER_QUERY } from "./queries";

export default class OrdersShowStore {
  order: SingleOrder | null = null;
  id: string | null = null;
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setId(id: string) {
    this.id = id;
  }

  setOrder(order: SingleOrder): void {
    this.order = order;
  }

  startLoading(): void {
    this.loading = true;
  }

  stopLoading(): void {
    this.loading = false;
  }

  *loadOrder() {
    this.startLoading();
    const { data } = yield client.query(ORDER_QUERY, { "number": this.id }).toPromise();
    if (data) {
      this.setOrder(data.order)
      console.log(data.order); 
    }
    this.stopLoading();
}
}
