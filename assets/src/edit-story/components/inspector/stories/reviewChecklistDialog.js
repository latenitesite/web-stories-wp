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
import { action } from '@storybook/addon-actions';
import { useCallback, useState } from 'react';

/**
 * Internal dependencies
 */
import ReviewChecklistDialog from '../prepublish/reviewChecklistDialog';
import { Button, BUTTON_TYPES } from '../../../../design-system';

export default {
  title: 'Stories Editor/Components/Dialog/Review Prepublish Checklist',
  component: ReviewChecklistDialog,
};

export const _default = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDialog = useCallback(
    () => setIsOpen((prevIsOpen) => !prevIsOpen),
    []
  );

  return (
    <>
      <Button type={BUTTON_TYPES.PRIMARY} onClick={toggleDialog}>
        {'Open Dialog'}
      </Button>
      <ReviewChecklistDialog
        open={isOpen}
        onClose={() => {
          toggleDialog();
          action('close dialog triggered')();
        }}
        onIgnore={action('on (ignore) secondary triggered')}
        onReview={action('on review (primary) triggered')}
      />
    </>
  );
};
