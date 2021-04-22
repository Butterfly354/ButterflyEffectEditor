import { downloadFile, openFile } from './FileManager';

//note: downloadFile is tested with selenium

test('Opening selected file and return content', async () => {
  var file = new File(['test'], 'Test.txt', { type: 'text/plain' });
  expect(openFile(file)).resolves.toEqual('test');
});

// Test works
test('Invalid parameters passed in openFile() will throw error', () => {
  var file = new File(['test'], 'Test.pdf', { type: 'application/pdf' });
  expect(() => {
    openFile(file);
  }).toThrow('Invalid file type.');
});
