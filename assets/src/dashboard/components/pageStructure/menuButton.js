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
import PropTypes from 'prop-types';
import { __ } from '@web-stories-wp/i18n';

/**
 * Internal dependencies
 */
import { Menu as MenuSvg } from '../../icons';
import { useNavContext } from '../navProvider';
import { MIN_DASHBOARD_WIDTH } from '../../constants';
import {
  Button,
  BUTTON_TYPES,
  BUTTON_SIZES,
  BUTTON_VARIANTS,
} from '../../../design-system';

const MenuIcon = styled(MenuSvg).attrs({ width: 24, height: 24 })`
  display: block;
  color: ${({ theme }) => theme.DEPRECATED_THEME.colors.gray900};
`;

const MenuButton = styled(Button)`
  padding: 0;
  margin-right: 16px;

  ${({ showOnlyOnSmallViewport }) =>
    showOnlyOnSmallViewport &&
    css`
      display: none;
      @media screen and (max-width: ${MIN_DASHBOARD_WIDTH}px) {
        display: inline-block;
      }
    `}
`;

export default function NavMenuButton({ showOnlyOnSmallViewport }) {
  const { actions, state } = useNavContext();

  return (
    <MenuButton
      onClick={actions.toggleSideBar}
      showOnlyOnSmallViewport={showOnlyOnSmallViewport}
      type={BUTTON_TYPES.TERTIARY}
      size={BUTTON_SIZES.SMALL}
      variant={BUTTON_VARIANTS.SQUARE}
      aria-label={__('toggle main navigation', 'web-stories')}
      aria-pressed={state.sideBarVisible}
    >
      <MenuIcon aria-hidden />
    </MenuButton>
  );
}

NavMenuButton.propTypes = {
  showOnlyOnSmallViewport: PropTypes.bool,
};
