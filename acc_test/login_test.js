
Feature('Login');

Scenario('Login with wrong mail', (I) => {
    I.amOnPage('/login');
    within('form', () => {
        I.fillField('email', 'user@user.com');
        I.fillField('password', 'user@user.com');
        I.click('Login');
      });
      I.retry({ retries: 3, minTimeout: 100 }).see('Username or password incorrect');
});

Scenario('Login with wrong password', (I) => {
    I.amOnPage('/login');
    within('form', () => {
        I.fillField('email', 'bla@mail.com');
        I.fillField('password', 'wrongpassword');
        I.click('Login');
      });
      I.retry({ retries: 3, minTimeout: 100 }).see('Username or password incorrect');
});

Scenario('Login with correct mail and password', (I) => {
    I.amOnPage('/login');
    within('form', () => {
        I.fillField('email', 'bla@mail.com');
        I.fillField('password', 'easypassword');
        I.click('Login');
      });
      I.retry({ retries: 3, minTimeout: 100 }).see('login successful');
});
