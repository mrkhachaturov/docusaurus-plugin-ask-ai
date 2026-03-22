import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useLocation } from '@docusaurus/router';
import { Menu } from './Menu';
import { MenuItem, Divider } from './MenuItem';
import { Toast } from './Toast';
import { SparkleIcon, ChevronIcon, CopyIcon, ExternalLinkIcon, FileIcon, resolveIcon } from './icons';
import { getMdPath, fetchMarkdown, buildPrompt } from './markdown';
import type { AskAiThemeConfig } from '../../types';
import styles from './styles.module.css';

export function AskAiButton() {
  const { siteConfig } = useDocusaurusContext();
  const location = useLocation();
  const config = (siteConfig.themeConfig.askAi ?? {}) as AskAiThemeConfig;
  const {
    buttonText = 'Use with AI',
    showCopyMarkdown = true,
    showViewMarkdown = true,
    showLlmsTxt = true,
    promptPrefix = 'Use the following {title} documentation to help me:\n\n',
    maxPromptLength = 7500,
    providers = [],
  } = config;

  const [isOpen, setIsOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const manifestRef = useRef<string[] | null>(null);

  const mdPath = useMemo(() => getMdPath(location.pathname), [location.pathname]);

  // Fetch manifest and check route — re-runs on every navigation
  useEffect(() => {
    setIsOpen(false);
    const checkRoute = async () => {
      if (manifestRef.current === null) {
        try {
          const res = await fetch(siteConfig.baseUrl + 'ask-ai-manifest.json');
          if (res.ok) {
            const data = await res.json();
            manifestRef.current = data.pages ?? [];
          } else {
            manifestRef.current = [];
          }
        } catch {
          manifestRef.current = [];
        }
      }
      const pathname = location.pathname;
      const normalized = pathname.endsWith('/')
        ? pathname.slice(0, -1)
        : pathname;
      const manifestPages = manifestRef.current ?? [];
      setIsVisible(
        manifestPages.some(
          (p) => p === pathname || p === normalized || p + '/' === pathname,
        ),
      );
    };
    checkRoute();
  }, [location.pathname, siteConfig.baseUrl]);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen]);

  const handleCopy = useCallback(async () => {
    setIsOpen(false);
    const md = await fetchMarkdown(mdPath);
    if (!md) { setToast('Markdown not available'); return; }
    try {
      await navigator.clipboard.writeText(md);
      setToast('Copied to clipboard');
    } catch {
      setToast('Copy not supported in this context');
    }
  }, [mdPath]);

  const handleView = useCallback(() => {
    setIsOpen(false);
    window.open(mdPath, '_blank');
  }, [mdPath]);

  const handleProvider = useCallback(async (url: string) => {
    setIsOpen(false);
    const md = await fetchMarkdown(mdPath);
    if (!md) {
      const fallbackUrl = url
        .replace(encodeURIComponent('{prompt}'), '')
        .replace('{prompt}', '')
        .replace(/[?&]$/, '')
        .replace(/\/$/, '');
      window.open(fallbackUrl, '_blank');
      return;
    }
    const pageUrl = window.location.origin + mdPath;
    const prompt = buildPrompt(md, document.title, promptPrefix, maxPromptLength, pageUrl);
    const finalUrl = url.replace('{prompt}', encodeURIComponent(prompt));
    window.open(finalUrl, '_blank');
  }, [mdPath, promptPrefix, maxPromptLength]);

  if (!isVisible) return null;

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <button
        className={styles.trigger}
        onClick={() => setIsOpen((o) => !o)}
        aria-expanded={isOpen}
        aria-controls="ask-ai-panel"
        ref={triggerRef}
        type="button"
      >
        <SparkleIcon size={16} />
        <span>{buttonText}</span>
        <ChevronIcon size={14} flipped={isOpen} />
      </button>

      <Menu isOpen={isOpen}>
        {showCopyMarkdown && (
          <MenuItem
            icon={<CopyIcon size={18} />}
            title="Copy page as Markdown"
            description="Copy to clipboard for pasting into any AI tool"
            onClick={handleCopy}
          />
        )}
        {showViewMarkdown && (
          <MenuItem
            icon={<ExternalLinkIcon size={18} />}
            title="View as Markdown"
            description="Open this page as clean Markdown in a new tab"
            href={mdPath}
          />
        )}
        {(showCopyMarkdown || showViewMarkdown) && providers.length > 0 && <Divider />}
        {providers.map((p) => (
          <MenuItem
            key={p.name}
            icon={resolveIcon(p.icon, 18)}
            title={`Open in ${p.name}`}
            description={p.description ?? `Chat about this page with ${p.name}`}
            onClick={() => handleProvider(p.url)}
          />
        ))}
        {showLlmsTxt && (
          <>
            {providers.length > 0 && <Divider />}
            <MenuItem
              icon={<FileIcon size={18} />}
              title="llms.txt"
              description="Full documentation index for LLMs"
              href={siteConfig.baseUrl + 'llms.txt'}
            />
          </>
        )}
      </Menu>

      <Toast message={toast} onDone={() => setToast(null)} />
    </div>
  );
}
