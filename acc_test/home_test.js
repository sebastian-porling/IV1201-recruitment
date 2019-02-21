
Feature('Home');

/**
 * Test if we will get the main headline of the frontpage
 */
Scenario('Show the front-page', (I) => {
  I.amOnPage('/');
  I.see('The top one tivoli employer!');
});

/**
 * Test if the home button goes to the frontpage
 */
Scenario('Click on home button', (I) => {
  I.amOnPage('/');
  I.click(locate('.navbar-toggler-icon'));
  I.click('Home');
  I.see('The top one tivoli employer!');
  I.seeInCurrentUrl('/')
});

/**
 * Test if the login button takes us to the sign in page
 */
Scenario('Click on login', (I) => {
  I.amOnPage('/');
  I.click(locate('.navbar-toggler-icon'));
  I.click('Login');
  I.seeInCurrentUrl('/login')
  I.see('Sign in');
});

/**
 * Test if the register button takes us to the sign up page
 */
Scenario('Click on register', (I) => {
  I.amOnPage('/');
  I.click(locate('.navbar-toggler-icon'));
  I.click('Register');
  I.seeInCurrentUrl('/register')
  I.see('Sign up');
  I.see('Your name');
  I.see('Your email');
  I.see('Confirm your email');
  I.see('Your password');
  I.see('REGISTER');
});

/**
 * Test if the logout button gives us message
 */
Scenario('Click on logout', (I) => {
  I.amOnPage('/');
  I.click(locate('.navbar-toggler-icon'));
  I.click('Logout');
  // Implement so we can see that we have been logged out.
});
