import { browser, element, by } from 'protractor';

export class FintSharedComponentsPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('fint-root h1')).getText();
  }
}
