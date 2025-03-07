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
import { waitFor } from '@testing-library/react';

/**
 * Internal dependencies
 */
import { Fixture } from '../../../../../karma/fixture';
import { useStory } from '../../../../../app/story';
import { formattedTemplatesArray } from '../../../../../../dashboard/storybookUtils';
import objectWithout from '../../../../../utils/objectWithout';
import useInsertElement from '../../../../../components/canvas/useInsertElement';

const expectPageTemplateEqual = (currentPage, template) => {
  expect(currentPage.id).not.toEqual(template.id);
  expect(currentPage.elements.length).toEqual(template.elements.length);
  template.elements.forEach((element, index) => {
    expect(objectWithout(currentPage.elements[index], ['id'])).toEqual(
      objectWithout(element, ['id'])
    );
  });
  expect(currentPage.animations.length).toEqual(
    (template.animations || []).length
  );
};

describe('CUJ: Page Templates: Creator can Apply a Page Template', () => {
  let fixture;
  let originalTimeout;

  beforeEach(async () => {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 300000;
    fixture = new Fixture();
    await fixture.render();
  });

  afterEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    fixture.restore();
  });

  it('should apply page template to an empty page', async () => {
    await fixture.editor.library.pageTemplatesTab.click();

    await waitFor(() =>
      expect(
        fixture.editor.library.pageTemplatesPane.pageTemplates.length
      ).toBeTruthy()
    );
    await fixture.events.click(
      fixture.editor.library.pageTemplatesPane.pageTemplate('Cooking Cover')
    );

    // check that all elements have been applied
    const currentPage = await fixture.renderHook(() =>
      useStory(({ state }) => state.currentPage)
    );
    const cookingTemplate = formattedTemplatesArray.find(
      (t) => t.title === 'Cooking'
    );
    const coverPage = cookingTemplate.pages.find(
      (p) => p.pageTemplateType === 'cover'
    );
    expectPageTemplateEqual(currentPage, coverPage);

    await fixture.snapshot('applied page template');
  });

  it('should apply page template to an empty page using keyboard', async () => {
    await fixture.editor.library.pageTemplatesTab.click();

    await waitFor(() =>
      expect(
        fixture.editor.library.pageTemplatesPane.pageTemplates.length
      ).toBeTruthy()
    );

    const { pageTemplates } = fixture.editor.library.pageTemplatesPane;
    await fixture.events.focus(
      fixture.editor.library.pageTemplatesPane.pageTemplates[0]
    );

    await fixture.events.keyboard.press('right');

    await fixture.events.keyboard.press('down');

    const activeTextSetId = pageTemplates[3].getAttribute('data-testid');
    const documentTestId = document.activeElement.getAttribute('data-testid');

    expect(activeTextSetId).toBe(documentTestId);
    await fixture.events.keyboard.press('Enter');

    // check that all elements have been applied
    const currentPage = await fixture.renderHook(() =>
      useStory(({ state }) => state.currentPage)
    );
    const cookingTemplate = formattedTemplatesArray.find(
      (t) => t.title === 'Cooking'
    );
    const coverPage = cookingTemplate.pages.find(
      (p) => p.pageTemplateType === 'cover'
    );
    expectPageTemplateEqual(currentPage, coverPage);

    await fixture.snapshot('applied page template');
  });

  it('should confirm and apply template to a page with changes', async () => {
    // Insert element to make the page have changes
    const insertElement = await fixture.renderHook(() => useInsertElement());
    await fixture.act(() =>
      insertElement('text', {
        x: 10,
        y: 10,
        width: 100,
        height: 50,
        content: 'Hello, Stories!',
      })
    );

    await fixture.editor.library.pageTemplatesTab.click();

    await waitFor(() =>
      expect(
        fixture.editor.library.pageTemplatesPane.pageTemplates.length
      ).toBeTruthy()
    );
    await fixture.events.click(
      fixture.editor.library.pageTemplatesPane.pageTemplate('Cooking Cover')
    );

    // confirm changes
    await waitFor(() => {
      expect(fixture.screen.getByRole('dialog')).toBeTruthy();
    });
    await fixture.events.click(
      fixture.screen.getByRole('button', { name: 'Apply Page Template' })
    );

    // check that all elements have been applied
    const currentPage = await fixture.renderHook(() =>
      useStory(({ state }) => state.currentPage)
    );
    const cookingTemplate = formattedTemplatesArray.find(
      (t) => t.title === 'Cooking'
    );
    const coverPage = cookingTemplate.pages.find(
      (p) => p.pageTemplateType === 'cover'
    );
    expectPageTemplateEqual(currentPage, coverPage);

    await fixture.snapshot('applied page template');
  });

  it('should confirm and cancel applying to a page with changes', async () => {
    // Insert element to make the page have changes
    const insertElement = await fixture.renderHook(() => useInsertElement());
    const element = await fixture.act(() =>
      insertElement('text', {
        x: 10,
        y: 10,
        width: 100,
        height: 50,
        content: 'Hello, Stories!',
      })
    );

    await fixture.editor.library.pageTemplatesTab.click();

    await waitFor(() =>
      expect(
        fixture.editor.library.pageTemplatesPane.pageTemplates.length
      ).toBeTruthy()
    );
    await fixture.events.click(
      fixture.editor.library.pageTemplatesPane.pageTemplate('Cooking Cover')
    );

    // confirm changes
    await waitFor(() => {
      expect(fixture.screen.getByRole('dialog')).toBeTruthy();
    });
    await fixture.events.click(
      fixture.screen.getByRole('button', { name: 'Cancel' })
    );

    // check that all elements have been applied
    const currentPage = await fixture.renderHook(() =>
      useStory(({ state }) => state.currentPage)
    );
    expect(currentPage.elements.length).toEqual(2);
    expect(currentPage.elements[1]).toEqual(element);
  });
});
