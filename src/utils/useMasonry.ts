import {useLayoutEffect, useRef} from 'react';

/**
 * 让 CSS Grid 中高度不一的卡片自动向上补齐空隙,形成瀑布流(masonry)效果。
 * 当 `dep` 变化(例如筛选分类切换导致卡片增减)时,会重新收集子元素并重新计算。
 * 使用 useLayoutEffect 在绘制前完成布局,避免首屏出现未补齐的闪烁。
 */
const useMasonry = (dep?: unknown) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const recompute = () => {
      const items = Array.from(container.children).filter(
        (el): el is HTMLElement => el instanceof HTMLElement,
      );
      if (items.length < 1) {
        return;
      }

      let gapSize = 0;
      const gap = window
        .getComputedStyle(container)
        .getPropertyValue('row-gap');
      gapSize = parseInt(gap, 10) || 0;

      items.forEach((el) => {
        el.style.marginTop = '0';
        let previous = el.previousElementSibling;
        while (previous) {
          if (
            previous instanceof HTMLElement &&
            previous.getBoundingClientRect().left ===
              el.getBoundingClientRect().left
          ) {
            const elTop = el.getBoundingClientRect().top + window.scrollY;
            const prevBottom =
              previous.getBoundingClientRect().bottom + window.scrollY;
            el.style.marginTop = `${-(elTop - prevBottom - gapSize)}px`;
            break;
          }
          previous = previous.previousElementSibling;
        }
      });
    };

    recompute();
    window.addEventListener('resize', recompute);
    return () => {
      window.removeEventListener('resize', recompute);
    };
  }, [dep]);

  return containerRef;
};

export default useMasonry;
