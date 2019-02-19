
Feature('Home');

Scenario('Show the front-page', (I) => {
    I.amOnPage('/');
    I.see('The top one tivoli employer!');
});

Scenario('Click on home button', (I) => {
    I.amOnPage('/');
    I.click(locate('.navbar-toggler-icon'));
    I.click('Home');
    I.see('The top one tivoli employer!');
    I.seeInCurrentUrl('/')
});

Scenario('Click on login', (I) => {
    I.amOnPage('/');
    I.click(locate('.navbar-toggler-icon'));
    I.click('Login');
    I.seeInCurrentUrl('/login')
    I.see('Sign in');
});

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

Scenario('Click on logout', (I) => {
    I.amOnPage('/');
    I.click(locate('.navbar-toggler-icon'));
    I.click('Logout');
    I.click('.navbar-toggler-icon');
    I.retry({ retries: 5, minTimeout: 400 }).see('You have been logged out.');
});
