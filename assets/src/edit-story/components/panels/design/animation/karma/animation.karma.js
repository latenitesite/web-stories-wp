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
 * Internal dependencies
 */
import { Fixture } from '../../../../../karma/fixture';
import { useStory } from '../../../../../app';
import { STORY_ANIMATION_STATE } from '../../../../../../animation';

describe('Animation Panel', function () {
  let fixture;

  beforeEach(async () => {
    fixture = new Fixture();
    await fixture.render();
  });

  afterEach(() => {
    fixture.restore();
  });

  it('should render the animation panel when an element is selected.', async function () {
    await fixture.events.click(fixture.editor.library.textAdd);
    const panel = fixture.editor.inspector.designPanel.animation;
    expect(panel).not.toBeNull();
  });

  // TODO #6953
  // eslint-disable-next-line jasmine/no-disabled-tests
  xit('can click the animation chooser and select an effect.', async function () {
    await fixture.events.click(fixture.editor.library.textAdd);
    const panel = fixture.editor.inspector.designPanel.animation;

    const effectChooser = panel.effectChooser;
    await fixture.events.click(effectChooser);
    await fixture.events.sleep(300);
    const fadeIn = await fixture.screen.getByRole('option', {
      name: /^Fade In Effect$/,
    });
    await fixture.events.click(fadeIn);
    await fixture.events.sleep(300);
    expect(effectChooser.innerText).toBe('Fade In');
  });

  it('replaces an existing effect with a new one.', async function () {
    await fixture.events.click(fixture.editor.library.textAdd);
    const panel = fixture.editor.inspector.designPanel.animation;

    const effectChooser = panel.effectChooser;
    await fixture.events.click(effectChooser);

    await fixture.events.click(
      fixture.screen.getByRole('option', { name: /^Fade In Effect$/ })
    );

    expect(effectChooser.innerText).toBe('Fade In');

    await fixture.events.click(
      fixture.screen.getByRole('option', { name: /^Drop Effect$/ })
    );

    expect(effectChooser.innerText).toBe('Drop');
  });

  it('plays the animation when a control in the panel is changed.', async function () {
    await fixture.events.click(fixture.editor.library.textAdd);
    const panel = fixture.editor.inspector.designPanel.animation;

    const effectChooser = panel.effectChooser;
    await fixture.events.click(effectChooser, { clickCount: 1 });

    await fixture.events.click(
      fixture.screen.getByRole('option', { name: /^Fade In Effect$/ })
    );
    await fixture.events.sleep(300);

    const { animationState } = await fixture.renderHook(() =>
      useStory(({ state }) => {
        return {
          animationState: state.animationState,
        };
      })
    );

    expect(animationState).toBe(STORY_ANIMATION_STATE.PLAYING_SELECTED);
  });
});
