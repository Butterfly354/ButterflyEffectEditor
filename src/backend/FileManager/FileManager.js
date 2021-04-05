/**
 * Function that allows the user to download their content
 *
 * @param {type} textInput           User's content in the text canvas stored in a variable
 * @param {type} fileName            User's input for the fileName
 */
export const downloadFile = (textInput, fileName) => {
  
  //If fileName is empty, it is assigned "Butterfly" as a default name
  if (fileName === '') {
    fileName = 'Butterfly';
  }

  var textInputAsBlob = new Blob([textInput], { type: 'text/plain' });
  var contentAsURL = window.URL.createObjectURL(textInputAsBlob);
  var textFileName = fileName;

  var downloadLink = document.createElement('a');
  downloadLink.download = textFileName;
  downloadLink.innerHTML = 'Download File';
  downloadLink.href = contentAsURL;
  downloadLink.onclick = destroyClickedElement;
  downloadLink.style.display = 'none';
  document.body.appendChild(downloadLink);

  downloadLink.click();
};

/**
 * Helper function that removes clicked element
 *
 * @param {type} event          onclick event
 */
const destroyClickedElement = (event) => {
  document.body.removeChild(event.target);
};

/**
 * Function that returns the content from the user's selected file
 *
 * @param {type} file           file blob of the user's selected file
 */
export const openFile = (file) => {

  // Getting the extension of the file
  let fileName = file.name;
  var fileExtension = fileName.split('.').pop();

  // If it has one of these extensions, it will throw an error
  let illegalExtension = [
    'css',
    'ico',
    'png',
    'pdf',
    'svg',
    'doc',
    'docs',
    'ppt',
    'json',
    'jpg',
    'jpeg',
    'docx'
  ];

  // The error will be thrown and the function will return an empty string
  if (illegalExtension.includes(fileExtension)) {
    throw Error('Invalid file type.');
  }
  
  return new Promise(function (resolve) {
    var reader = new FileReader();
    reader.onloadend = function () {
      resolve(reader.result);
    };
    reader.readAsText(file);
  });
};
