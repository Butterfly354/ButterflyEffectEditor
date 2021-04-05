import { downloadFile, openFile } from './FileManager';

// Tried looking at how to locate or set filepath, but it doesn't work because of security reasons 
// Tried putting something where if it was downloaded it will receive a boolean for a successful download
// In the end, windows.URL is a function for browswer so only works in the browswer
// May not be able to include any test cases for downloadFile()

// test('Saving the content and downloading it as a text file', () => {
//   expect(downloadFile("Test works", "Butterfly")
//   ).toEqual(true);
// })

// test('Passing empty parameters to downloadFile()', () => {
//     downloadFile('', 'Butterfly');
//     expect('');
// })

// Couldn't find a way to write to the created textfile, so decided to check if the returned value is a string in the end
// But it returns an object Promise

// test('Opening selected file and return content', () => {
//   var file = new File(["test"], "Test.txt", {type: "text/plain"});
//   //var test = openFile(file).then(result => result);
//   //expect(typeof test).toEqual(typeof "");
//   let value;
//   async function getTestString() {
//     value = await openFile(file)
//     return value;
//   };
//   expect(typeof getTestString()).toEqual(typeof "");
// });

// Test works
test('Invalid parameters passed in openFile() will throw error', () => {
  var file = new File(["test"], "Test.pdf", {type: "application/pdf"});
    expect(() => {
        openFile(file)
    }).toThrow('Invalid file type.');
})
