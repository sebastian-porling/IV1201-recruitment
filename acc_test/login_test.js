
Feature('Login');

/**
 * Test if we get error if the username is incorrect
 */
Scenario('Login with wrong mail', (I) => {
  I.amOnPage('/login');
  within('form', () => {
    I.fillField('email', 'user@user.com');
    I.fillField('password', 'user@user.com');
    I.click('Login');
    I.waitForText('Username or password incorrect', 5);
  });
});

/**
 * Test if the password is incorrect
 */
Scenario('Login with wrong password', (I) => {
  I.amOnPage('/login');
  within('form', () => {
    I.fillField('email', 'bla@mail.com');
    I.fillField('password', 'wrongpassword');
    I.click('Login');
    I.waitForText('Username or password incorrect', 5);
  });
});

/**
 * Test if the login works, and we get a successfull login message
 */
Scenario('Login with correct mail and password', (I) => {
  I.amOnPage('/login');
  within('form', () => {
    I.fillField('email', 'bla@mail.com');
    I.fillField('password', 'easypassword');
    I.click('Login');
    I.waitForText('Welcome', 5);
  });
});

/**
 * Test if the logout button gives us message
 */
Scenario('Click on logout', (I) => {
  I.amOnPage('/login');
  within('form', () => {
    I.fillField('email', 'bla@mail.com');
    I.fillField('password', 'easypassword');
    I.click('Login');
    I.waitForText('Welcome', 5);
  });
  I.click(locate('.navbar-toggler-icon'));
  I.click('Logout');
  I.waitForText('The top one tivoli employer!', 5);
});
