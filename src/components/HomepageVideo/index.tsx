import {useEffect, useRef, useState, type MouseEvent, type ReactNode} from 'react';
import Translate from '@docusaurus/Translate';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

export default function HomepageVideo(): ReactNode {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const poster = useBaseUrl('img/fastgpt-video-poster.jpg');
  const video = useBaseUrl('videos/fastgpt-overview.mp4');
  const glow = useBaseUrl('img/illustrations/video-secondary-illustration-light.svg');

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
      void videoRef.current?.play();
    } else if (dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  const close = () => {
    videoRef.current?.pause();
    setIsOpen(false);
  };

  const closeFromBackdrop = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) close();
  };

  return (
    <div className={styles.wrapper}>
      <img
        className={styles.glow}
        src={glow}
        width={1165}
        height={1012}
        alt=""
        aria-hidden="true"
      />
      <button
        type="button"
        className={styles.preview}
        onClick={() => setIsOpen(true)}
        aria-label="播放 FastGPT 宣传片">
        <img
          className={styles.poster}
          src={poster}
          width={1280}
          height={720}
          alt="FastGPT 企业 AI 应用构建界面"
          loading="eager"
          fetchPriority="high"
        />
        <span className={styles.posterOverlay} aria-hidden="true" />
        <span className={styles.playBadge} aria-hidden="true">
          <span className={styles.playContent}>
            <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
              <path
                fill="url(#video-play-gradient)"
                fillRule="evenodd"
                d="M10 20c5.523 0 10-4.477 10-10S15.523 0 10 0 0 4.477 0 10s4.477 10 10 10Zm3.5-10-5-3.5v7l5-3.5Z"
                clipRule="evenodd"
              />
              <defs>
                <linearGradient
                  id="video-play-gradient"
                  x1="10"
                  x2="10"
                  y1="0"
                  y2="20"
                  gradientUnits="userSpaceOnUse">
                  <stop stopColor="#6366f1" />
                  <stop offset="1" stopColor="#6366f1" stopOpacity=".72" />
                </linearGradient>
              </defs>
            </svg>
            <span className={styles.playText}>
              <Translate id="homepage.video.play">观看宣传片</Translate>
              <span className={styles.separator}> - </span>
              01:34
            </span>
          </span>
        </span>
      </button>

      <dialog
        ref={dialogRef}
        className={styles.dialog}
        aria-label="FastGPT 宣传片"
        onClick={closeFromBackdrop}
        onCancel={(event) => {
          event.preventDefault();
          close();
        }}
        onClose={() => setIsOpen(false)}>
        <div className={styles.playerShell}>
          <button
            type="button"
            className={styles.closeButton}
            onClick={close}
            aria-label="关闭视频">
            <span aria-hidden="true">&times;</span>
          </button>
          {isOpen && (
            <video
              ref={videoRef}
              className={styles.video}
              controls
              playsInline
              preload="metadata"
              poster={poster}>
              <source src={video} type="video/mp4" />
              <Translate id="homepage.video.unsupported">
                当前浏览器不支持播放该视频。
              </Translate>
            </video>
          )}
        </div>
      </dialog>
    </div>
  );
}
