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
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import {
  useLayoutEffect,
  useEffect,
  useCallback,
  useState,
  useRef,
} from 'react';
/**
 * Internal dependencies
 */
import { useResizeEffect } from '../../../design-system';
import { getTransforms, getOffset } from './utils';

/**
 * Internal dependencies
 */

export const Placement = {
  // TOP
  TOP: 'top',
  TOP_START: 'top-start',
  TOP_END: 'top-end',
  // BOTTOM
  BOTTOM: 'bottom',
  BOTTOM_START: 'bottom-start',
  BOTTOM_END: 'bottom-end',
  // RIGHT
  RIGHT: 'right',
  RIGHT_START: 'right-start',
  RIGHT_END: 'right-end',
  // LEFT
  LEFT: 'left',
  LEFT_START: 'left-start',
  LEFT_END: 'left-end',
};

const Container = styled.div.attrs(
  ({ $offset: { x, y, width, height }, fillWidth, fillHeight, placement }) => ({
    style: {
      transform: `translate(${x}px, ${y}px) ${getTransforms(placement)}`,
      ...(fillWidth ? { width: `${width}px` } : {}),
      ...(fillHeight ? { height: `${height}px` } : {}),
    },
  })
)`
  /*! @noflip */
  left: 0px;
  top: 0px;
  position: fixed;
  z-index: 2;
  overflow-y: scroll;
  max-height: 100vh;
`;

function Popup({
  anchor,
  dock,
  children,
  renderContents,
  placement = Placement.BOTTOM,
  spacing,
  isOpen,
  fillWidth = false,
  fillHeight = false,
  onPositionUpdate = () => {},
}) {
  const [popupState, setPopupState] = useState(null);
  const [mounted, setMounted] = useState(false);
  const popup = useRef(null);

  const positionPopup = useCallback(
    (evt) => {
      if (!mounted) {
        return;
      }

      // If scrolling within the popup, ignore.
      if (evt?.target?.nodeType && popup.current?.contains(evt.target)) {
        return;
      }
      setPopupState({
        offset:
          anchor?.current && getOffset(placement, spacing, anchor, dock, popup),
        height: popup.current?.getBoundingClientRect()?.height,
      });
    },
    [anchor, dock, placement, spacing, mounted]
  );

  useEffect(() => {
    // If the popup height changes meanwhile, let's update the popup, too.
    if (
      popupState?.height &&
      popupState.height !== popup.current?.getBoundingClientRect()?.height
    ) {
      positionPopup();
    }
  }, [popupState?.height, positionPopup]);

  useLayoutEffect(() => {
    setMounted(true);
    if (!isOpen) {
      return undefined;
    }
    positionPopup();

    // Adjust the position when scrolling.
    document.addEventListener('scroll', positionPopup, true);
    return () => document.removeEventListener('scroll', positionPopup, true);
  }, [isOpen, positionPopup]);

  useLayoutEffect(onPositionUpdate, [popupState, onPositionUpdate]);

  useResizeEffect({ current: document.body }, positionPopup, [positionPopup]);

  return popupState && isOpen
    ? createPortal(
        <Container
          ref={popup}
          fillWidth={fillWidth}
          fillHeight={fillHeight}
          placement={placement}
          $offset={popupState.offset}
        >
          {renderContents
            ? renderContents({ propagateDimensionChange: positionPopup })
            : children}
        </Container>,
        document.body
      )
    : null;
}

export default Popup;
