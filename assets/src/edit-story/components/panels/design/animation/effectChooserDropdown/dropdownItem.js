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
import { forwardRef } from 'react';
/**
 * Internal dependencies
 */
import { Tooltip } from '../../../../../../design-system';
import { AnimationListItem, ContentWrapper } from './styles';
import { ANIMATION_DROPDOWN_OPTION_PROP_TYPE } from './dropdownConstants';

const DropDownItem = forwardRef(({ option, ...rest }, ref) => (
  <AnimationListItem
    ref={ref}
    aria-label={option.animation?.ariaLabel || option.label}
    disabled={option.disabled}
    aria-disabled={option.disabled}
    size={option.animation?.size}
    gridSpace={option.animation?.gridSpace}
    noEffect={!option.animation?.Effect}
    {...rest}
  >
    <Tooltip title={option?.tooltip || ''}>
      <ContentWrapper>{option.label}</ContentWrapper>
      {option.animation?.Effect && (
        <option.animation.Effect>{option.label}</option.animation.Effect>
      )}
    </Tooltip>
  </AnimationListItem>
));

export default DropDownItem;

DropDownItem.displayName = 'DropDownItem';

DropDownItem.propTypes = {
  option: ANIMATION_DROPDOWN_OPTION_PROP_TYPE,
};
