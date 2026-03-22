import React from 'react';
import styles from './styles.module.css';

interface MenuProps {
  isOpen: boolean;
  children: React.ReactNode;
}

export function Menu({ isOpen, children }: MenuProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.menu} id="ask-ai-panel">
      {children}
    </div>
  );
}
