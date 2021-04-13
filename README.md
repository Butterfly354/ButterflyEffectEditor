
Here are the tests that I recorded.It is a predefined sequence of actions that must be performed when the UI is in its original state first. 

-Creating a single group and deleting a single group
-Creating group1
-Creating group2
-Deleting all groups 
-Opening and downloading a file

For the test involving the open file and downloading file options, you have to do the following in order to let the browser read your text file during the selenium run test.

On Chrome you can go to: Window > More Tools > Extensions > Selenium IDE > Details

Then turn on the 'Allow access to file URLs' option.


You have to select the line where td=input with the value that shows the path of your text file and then on the value input field you have to manually enter the path
of your text file.

selenium will not close the pop up windown from the file explorer you have to do it yourself  during the run test.
