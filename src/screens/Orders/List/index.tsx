import React, { useEffect } from "react";
import styles from "./styles.m.styl";
import { map } from "lodash";
import { observer } from "mobx-react-lite";
import OrdersListState from "./store";
import { OrdersListItem } from "./types";

import Button from "~/components/Button";
import AngleLeftIcon from "~/assets/icons/angle-left-solid.svg";
import AngleRightIcon from "~/assets/icons/angle-right-solid.svg";
import ListItem from "./components/ListItem";
import Skeleton from "~/components/Skeleton";
import { Preloader } from "~/components/Preloader";

const OrdersList = observer(
  (): JSX.Element => {
    const [state] = React.useState(new OrdersListState());

    useEffect(() => {
      if (state.initialized || state.loading) return;
      state.initialize();
    });
    
    return (
      <React.Fragment>
        <div className={styles.screenWrapper}>
          <div className={styles.screen}>
            {state.loading && !state.initialized && <Preloader className={styles.preloader}/>}
            {state.initialized && (
              <div className={styles.table}>
                <div className={styles.head}>
                  <div className={styles.row}>
                    <div>Номер</div>
                    <div>Создан</div>
                    <div>Доставка</div>
                    <div>В работе</div>
                    <div>Статус</div>
                  </div>
                </div>
                <div className={styles.body}>
                  {!state.loading && 
                    map(state.orders, (order: OrdersListItem, index: number) => (
                      <ListItem order={order} key={index} />
                    ))}
                  {state.loading && <Skeletons />}
                </div>        
              </div>
              
            )}
            {state.initialized && <div className={styles.pagination}>
              <Button
                small
                text="PREV"
                icon={AngleLeftIcon}
                resting
                disabled={!state.canPrev}
                onClick={() => state.prevPage()}
              />
              <Button
                small
                text="NEXT"
                rightIcon={AngleRightIcon}
                resting
                disabled={!state.canNext}
                onClick={() => state.nextPage()}
              />
            </div>}
          </div>
        </div>
      </React.Fragment>
    );
  }
);

const Skeletons = () => <>{[1, 2, 3, 4].map((_, i) => 
  <div key={i} className={styles.skeleton}><Skeleton /></div>
)}</>

export default OrdersList;
