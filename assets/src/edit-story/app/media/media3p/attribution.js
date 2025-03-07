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
import { __ } from '@web-stories-wp/i18n';
import styled, { css } from 'styled-components';
import { rgba } from 'polished';

/**
 * Internal dependencies
 */
import { ReactComponent as UnsplashLogoFull } from '../../../icons/unsplash_logo_full.svg';
import { ReactComponent as CoverrLogoFull } from '../../../icons/coverr_logo.svg';
import { ReactComponent as TenorLogoFull } from '../../../icons/tenor_logo_white.svg';
import {
  Text as DefaultText,
  THEME_CONSTANTS,
} from '../../../../design-system';

const AttributionPill = styled.div`
  position: absolute;
  left: 24px;
  bottom: 10px;
  border-radius: 100px;
  padding: 2px 8px;
  height: 24px;
  display: flex;
  flex-wrap: nowrap;
  background-color: ${({ theme }) => rgba(theme.colors.standard.black, 0.7)};
  cursor: pointer;
  align-items: center;
`;

const Text = styled(DefaultText)`
  color: ${({ theme }) => theme.colors.fg.primary};
`;

const logo = css`
  color: ${({ theme }) => theme.colors.standard.white};
  fill: ${({ theme }) => theme.colors.standard.white};
  margin-left: 6px;
  line-height: 14px;
`;

const UnsplashLogo = styled(UnsplashLogoFull)`
  height: 14px;
  ${logo}
`;

const CoverrLogo = styled(CoverrLogoFull)`
  ${logo}
  height: 12px;
  margin-top: 2px;
`;

const TenorLogo = styled(TenorLogoFull)`
  height: 14px;
  ${logo}
  margin: 0 2px 2px 6px;
`;

const unsplashUrl =
  'https://unsplash.com?utm_source=web_stories_wordpress&utm_medium=referral';
const coverrUrl =
  'https://coverr.co?utm_source=web_stories_wordpress&utm_medium=referral&utm_campaign=api_powered_by';
const tenorUrl =
  'https://tenor.com?utm_source=web_stories_wordpress&utm_medium=referral';

export function UnsplashAttribution() {
  return (
    <a href={unsplashUrl} target={'_blank'} rel={'noreferrer'}>
      <AttributionPill>
        <Text
          forwardedAs="span"
          size={THEME_CONSTANTS.TYPOGRAPHY.PRESET_SIZES.X_SMALL}
        >
          {__('Powered by', 'web-stories')}
        </Text>
        <UnsplashLogo />
      </AttributionPill>
    </a>
  );
}

export function CoverrAttribution() {
  return (
    <a href={coverrUrl} target={'_blank'} rel={'noreferrer'}>
      <AttributionPill>
        <Text
          forwardedAs="span"
          size={THEME_CONSTANTS.TYPOGRAPHY.PRESET_SIZES.X_SMALL}
        >
          {__('Powered by', 'web-stories')}
        </Text>
        <CoverrLogo />
      </AttributionPill>
    </a>
  );
}

export function TenorAttribution() {
  return (
    <a href={tenorUrl} target={'_blank'} rel={'noreferrer'}>
      <AttributionPill>
        <TenorLogo data-label={__('Powered by Tenor', 'web-stories')} />
      </AttributionPill>
    </a>
  );
}
