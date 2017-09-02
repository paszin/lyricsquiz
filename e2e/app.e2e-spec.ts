import { MyAppPage } from './app.po';

describe('my-app App', () => {
  let page: MyAppPage;

  beforeEach(() => {
    page = new MyAppPage();
  });

  it('should display login button', () => {
    page.navigateTo();
    expect(page.getButtonText()).toEqual('LOGIN WITH SPOTIFY');
  });
});
