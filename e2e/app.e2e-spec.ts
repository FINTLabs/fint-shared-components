import { FintSharedComponentsPage } from './app.po';

describe('fint-shared-components App', function() {
  let page: FintSharedComponentsPage;

  beforeEach(() => {
    page = new FintSharedComponentsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('fint works!');
  });
});
