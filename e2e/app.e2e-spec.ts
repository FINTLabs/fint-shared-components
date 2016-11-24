import { FintSharedComponentsNewPage } from './app.po';

describe('fint-shared-components-new App', function() {
  let page: FintSharedComponentsNewPage;

  beforeEach(() => {
    page = new FintSharedComponentsNewPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
