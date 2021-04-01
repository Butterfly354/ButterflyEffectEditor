/**
 * Function that allows the user to download their content
 *
 * @param {type} textInput           User's content in the text canvas stored in a variable
 * @param {type} fileName            User's input for the fileName
 */
export const saveAsFile = (textInput, fileName) => {
  //If fileName is empty, it is assigned "Butterfly" as a default name
  if (fileName === '') {
    fileName = 'Butterfly';
  }

  // (Currently saving the content as just a plain text file; was able to download as .doc, but not sure if we can load it)
  // var textFileType;
  // switch(fileType) {
  //     case ".txt":
  //       textFileType = "text/plain";
  //       break;
  //     case ".doc":
  //       textFileType = "application/msword";
  //       break;
  //     default:
  //       // code block
  //   }

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
 * @param {type} filePath           file path of the user's selected file
 */
export const openFile = (filePath) => {
  // Getting the extension of the file
  let fileName = filePath.name;
  var fileExtension = fileName.split('.').pop();

  // (Currently only accepting plain text files)
  // If it's not a plain text file, throw error
  if (!(fileExtension === 'txt')) {
    throw Error('Invalid file type.');
  }

  // Read from file and store in a string
  var fileReader = new FileReader();
  fileReader.readAsText(filePath);
  fileReader.onload = function (event) {
    return event.target.result;
  };
};
