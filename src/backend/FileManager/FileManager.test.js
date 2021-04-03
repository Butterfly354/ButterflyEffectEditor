import { downloadFile, openFile } from './FileManager';

// test('Saving the content and downloading it as a text file', () => {
//     downloadFile('Butterfly Effect Editor', 'Butterfly');

//     expect('');
// })

// test('Passing empty parameters to downloadFile()', () => {
//     downloadFile('', 'Butterfly');

//     expect('');
// })

test('Opening selected file and saving file content in variable', () => {
  expect(openFile('src/backend/FileManager/ButterflyTest.txt')).toStrictEqual(
    'Butterfly Effect Editor'
  );
});

// test('Invalid parameters passed in openFile() will throw error', () => {
//     expect(() => {
//         openFile('ButterflyTextError.rtf')
//     }).toThrow('Invalid File Type.');

//     // Where do I find a text file that is more than 2 Gb??
//     expect(() => {
//         openFile('')
//     }).toThrow('Invalid File Size.');
// })
