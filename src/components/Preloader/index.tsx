import React from 'react';

import PreloaderIcon from "~/assets/icons/rotate.svg";

import styles from './styles.m.styl';

type TPreloaderProps = {
  className?: string;
};

export const Preloader = ({ className }: TPreloaderProps) => (
  <div className={styles.preloader}>
    <PreloaderIcon className={className}/>
  </div>
);
