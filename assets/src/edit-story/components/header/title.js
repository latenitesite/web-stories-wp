/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * External dependencies
 */
import styled, { css } from 'styled-components';
import { useCallback } from 'react';
import { __ } from '@web-stories-wp/i18n';

/**
 * Internal dependencies
 */
import { themeHelpers } from '../../../design-system';
import { useStory } from '../../app/story';
import { useConfig } from '../../app/config';
import cleanForSlug from '../../utils/cleanForSlug';
import { styles, states, useFocusHighlight } from '../../app/highlights';
import useHeader from './use';

const Input = styled.input`
  color: ${({ theme }) => `${theme.colors.fg.primary} !important`};
  margin: 0;
  ${themeHelpers.expandTextPreset(
    ({ paragraph }, { MEDIUM }) => paragraph[MEDIUM]
  )}
  background: ${({ isHighlighted }) => !isHighlighted && 'none !important'};
  border: none !important;
  text-align: start;
  min-width: 60%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  ${({ isHighlighted }) =>
    isHighlighted &&
    css`
      ${styles.OUTLINE}
      ${styles.FLASH}
    `}
`;

function Title() {
  const { title, slug, updateStory } = useStory(
    ({
      state: {
        story: { title, slug },
      },
      actions: { updateStory },
    }) => ({ title, slug, updateStory })
  );
  const { setTitleInput, titleInput } = useHeader();
  const highlight = useFocusHighlight(states.STORY_TITLE, {
    current: titleInput,
  });

  const { storyId } = useConfig();

  const handleChange = useCallback(
    (evt) => updateStory({ properties: { title: evt.target.value } }),
    [updateStory]
  );

  const handleBlur = useCallback(() => {
    if (!slug || slug === storyId) {
      const cleanSlug = encodeURIComponent(cleanForSlug(title)) || storyId;
      updateStory({ properties: { slug: cleanSlug } });
    }
  }, [slug, storyId, title, updateStory]);

  if (typeof title !== 'string') {
    return null;
  }

  return (
    <Input
      ref={setTitleInput}
      value={title}
      type="text"
      onBlur={handleBlur}
      onChange={handleChange}
      placeholder={__('Add title', 'web-stories')}
      aria-label={__('Story title', 'web-stories')}
      isHighlighted={highlight?.showEffect}
    />
  );
}

export default Title;
