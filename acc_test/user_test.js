
Feature('User page');

Scenario('Failed to acces user page because not logged in', (I) => {
	I.amOnPage('/user');
	I.seeInCurrentUrl('/login')
});
