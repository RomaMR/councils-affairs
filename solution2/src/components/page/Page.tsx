import React from 'react';
import clsx from 'clsx';
import styles from './Page.module.scss';
import {Paper} from "@material-ui/core";

interface PageProps {
  title: string;
  children: JSX.Element;
  aside?: JSX.Element | JSX.Element[];
  actions?: JSX.Element | JSX.Element[];
  isPageHeight?: boolean;
}

function Page({ title, children, aside, actions, isPageHeight }: PageProps) {

  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <div className={styles.pageHeaderTitle}>
          {title}
        </div>
        <div className={styles.pageHeaderActions}>
          {actions}
        </div>
      </header>
      <Paper className={styles.pageAside} elevation={12}>
        {aside}
      </Paper>
      <section className={clsx(styles.pageContent, { [styles.pageContentPageHeight]: isPageHeight })}>
        {children}
      </section>
    </div>
  );
}

export default Page;
