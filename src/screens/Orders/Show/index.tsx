import React, { useEffect } from "react";
import OrdersShowStore from "./store";
import { observer } from "mobx-react-lite";
import { useHistory, useParams } from "react-router-dom";
import styles from "./styles.m.styl";
import { map } from "lodash";
import OrderItem from "./components/Item";
import { SingleOrderItem } from "./types";
import AngleLeftIcon from "~/assets/icons/angle-left-solid.svg";
import Button from "~/components/Button";
import { Preloader } from "~/components/Preloader";
import OrderStatus from "~/components/OrderStatus";

type ShowParams = {
  id: string;
};

const OrdersShow = observer(
  (): JSX.Element => {
    const [state] = React.useState(new OrdersShowStore());

    const params = useParams<{ id: string }>();
    const history = useHistory();

    useEffect(() => {
      if (state.order?.id === +params.id) return;
      state.setId(params.id)
      state.loadOrder();
    }, [params.id, state]);

    const orderItems = state.order?.items.length
      ? <ol className={styles.items}>
        {map(state.order?.items, (item: SingleOrderItem, index: number) => (
          <li>
            <span></span>
            <OrderItem item={item} key={index} />
          </li>
        ))}
      </ol>
      : <div className={styles.emptyTable}>No entries</div>

    const onBackButtonClick = () => {
      history.goBack();
    }

    return (
      <div className={styles.screenWrapper}>
        <nav className={styles.nav}>
          <Button
            small
            text="BACK"
            icon={AngleLeftIcon}
            resting
            onClick={onBackButtonClick}
          />
        </nav>
        <div className={styles.screen}>
          {state.loading && <Preloader className={styles.preloader} />}
          {!state.loading && state.order &&
            <>
              <div className={styles.order}>
                <div>Order #{state.order.id}</div>
                <OrderStatus code={state.order.status} />
              </div>
              <div className={styles.orderList}>
                {orderItems}
              </div>
              <div className={styles.delivery}>
                <div>Shipping method:</div>
                <div>{state.order.delivery.code ?? "Non-specified"}</div>
              </div>
            </>
          }
        </div>
      </div>
    );
  }
);

export default OrdersShow;
