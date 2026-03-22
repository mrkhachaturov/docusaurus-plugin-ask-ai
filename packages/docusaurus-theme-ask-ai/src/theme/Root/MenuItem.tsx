import React from 'react';
import styles from './styles.module.css';

interface MenuItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick?: () => void;
  href?: string;
}

export function MenuItem({ icon, title, description, onClick, href }: MenuItemProps) {
  const content = (
    <>
      <span className={styles.menuItemIcon}>{icon}</span>
      <span className={styles.menuItemText}>
        <span className={styles.menuItemTitle}>{title}</span>
        <span className={styles.menuItemDesc}>{description}</span>
      </span>
    </>
  );

  if (href) {
    return (
      <a
        className={styles.menuItem}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content}
      </a>
    );
  }

  return (
    <button className={styles.menuItem} onClick={onClick} type="button">
      {content}
    </button>
  );
}

export function Divider() {
  return <div className={styles.divider} />;
}
