To run the Selenium tests:

1. install selenium IDE for chrome https://chrome.google.com/webstore/detail/selenium-ide/mooikfkahbdckldjjndioackbalphokd?hl=en

2. choose Open an existing project

3. open the ButterflyUI.side project from the Selenium branch from our repo.

4. you can run the tests inside the project


Here are the recorded tests. It is a predefined sequence of actions that must be performed when the UI is in its original state first.

-Creating a single group and deleting a single group

-Creating group1

-Creating group2

-Deleting all groups 

-Opening and downloading a file

-Creating, moving, deleting edits

For the test involving the open file and download file options, you have to do the following in order to let the browser read your text file during the selenium run test.

On Chrome you can go to: Window > More Tools > Extensions > Selenium IDE > Details

Then turn on the 'Allow access to file URLs' option.


You have to select the line where td=input with the value that shows the path of your text file and then on the value input field, you have to manually enter the path
of your text file.

Selenium will not close the popup window from the file explorer, you have to do it yourself during the run test.
