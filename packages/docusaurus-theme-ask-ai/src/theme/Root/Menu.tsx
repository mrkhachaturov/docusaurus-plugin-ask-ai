import React from 'react';
import styles from './styles.module.css';

interface MenuProps {
  isOpen: boolean;
  dropDown?: boolean;
  children: React.ReactNode;
}

export function Menu({ isOpen, dropDown, children }: MenuProps) {
  if (!isOpen) return null;

  return (
    <div className={`${styles.menu} ${dropDown ? styles.menuDropDown : ''}`} id="ask-ai-panel">
      {children}
    </div>
  );
}
