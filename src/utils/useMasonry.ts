import {useEffect, useRef, useState} from 'react';

/**
 * 复刻 open-react-template 的 useMasonry:让 CSS Grid 中高度不一的卡片
 * 自动向上补齐空隙,形成瀑布流(masonry)效果。适配 Docusaurus 的 TS 严格模式。
 */
const useMasonry = () => {
  const masonryContainer = useRef<HTMLDivElement | null>(null);
  const [items, setItems] = useState<Element[]>([]);

  // 挂载后收集网格内的直接子元素(每张卡片)
  useEffect(() => {
    if (masonryContainer.current) {
      setItems(Array.from(masonryContainer.current.children));
    }
  }, []);

  useEffect(() => {
    const handleMasonry = () => {
      if (items.length < 1) {
        return;
      }
      let gapSize = 0;
      if (masonryContainer.current) {
        const gap = window
          .getComputedStyle(masonryContainer.current)
          .getPropertyValue('row-gap');
        gapSize = parseInt(gap, 10) || 0;
      }

      items.forEach((el) => {
        if (!(el instanceof HTMLElement)) {
          return;
        }
        let previous = el.previousElementSibling;
        while (previous) {
          el.style.marginTop = '0';
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

    handleMasonry();
    window.addEventListener('resize', handleMasonry);
    return () => {
      window.removeEventListener('resize', handleMasonry);
    };
  }, [items]);

  return masonryContainer;
};

export default useMasonry;
