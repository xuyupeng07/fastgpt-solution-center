/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import {pinyin} from 'pinyin-pro';
import Tag from '@theme/Tag';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

/**
 * 计算标签的分组标题字母。
 * - 中文：取首字拼音的首字母（如「公告」→「G」）
 * - 英文/数字：保留原字符并大写（如「FAQ」→「F」）
 */
function getTagLetter(label) {
  if (!label) {
    return '#';
  }
  const firstChar = label.charAt(0);
  const firstLetter = pinyin(firstChar, {pattern: 'first', toneType: 'none'});
  return (firstLetter?.charAt(0) || firstChar).toUpperCase();
}

function listTagsByLetters(tags) {
  const groups = {};
  Object.values(tags).forEach((tag) => {
    const initial = getTagLetter(tag.label);
    groups[initial] ??= [];
    groups[initial].push(tag);
  });
  return Object.entries(groups)
    .sort(([letter1], [letter2]) => letter1.localeCompare(letter2))
    .map(([letter, letterTags]) => ({
      letter,
      tags: letterTags.sort((tag1, tag2) =>
        tag1.label.localeCompare(tag2.label),
      ),
    }));
}

function TagLetterEntryItem({letterEntry}) {
  return (
    <article>
      <Heading as="h2" id={letterEntry.letter}>
        {letterEntry.letter}
      </Heading>
      <ul className="padding--none">
        {letterEntry.tags.map((tag) => (
          <li key={tag.permalink} className={styles.tag}>
            <Tag {...tag} />
          </li>
        ))}
      </ul>
      <hr />
    </article>
  );
}

export default function TagsListByLetter({tags}) {
  const letterList = listTagsByLetters(tags);
  return (
    <section className="margin-vert--lg">
      {letterList.map((letterEntry) => (
        <TagLetterEntryItem
          key={letterEntry.letter}
          letterEntry={letterEntry}
        />
      ))}
    </section>
  );
}
