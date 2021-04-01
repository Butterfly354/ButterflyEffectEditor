import fs from 'fs';

/**
 * Function that allows the user to download their content
 *
 * @param {type} textInput           User's content in the text canvas stored in a variable
 * @param {type} fileName            User's input for the fileName
 */
export const saveAsFile = (textInput, fileName) => {
    //If fileName is empty, it is assigned "Butterfly" as a default name
    if(fileName == "")
    {
        fileName = "Butterfly";
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

    var textInputAsBlob = new Blob([textInput], {type:"text/plain"});
    var contentAsURL = window.URL.createObjectURL(textInputAsBlob);
    var textFileName = fileName;
    
    var downloadLink = document.createElement("a");
    downloadLink.download = textFileName;
    downloadLink.innerHTML = "Download File";
    downloadLink.href = contentAsURL;
    downloadLink.onclick = destroyClickedElement;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
 
    downloadLink.click();
}

/**
 * Helper function that removes clicked element
 *
 * @param {type} event          onclick event
 */
export const destroyClickedElement = (event) => {
    document.body.removeChild(event.target);
}

// /**
//  * Function that returns the content from the user's selected file
//  *
//  * @param {type} filePath           file path of the user's selected file
//  */
// export const openFile = (filePath) => {
    
//     // Getting the extension of the file
//     var fileExtension = filePath.split('.').pop();
    
//     // (Currently only accepting plain text files)
//     // If it's not a plain text file, throw error
//     if(!(fileExtension == "txt")) {
//         throw Error("Invalid file type.");
//     }
    
//     // Getting the file size
//     var fileSize = filePath.size;

//     // // If the file size is not less than 2e9 bytes (2Gb), throw error
//     // if(!(fileSize <= 2e9)) {
//     //     throw Error("Invalid file size.")
//     // }

//     // // It was mentioned in Design Considerations in A2, that we would ask the user if the file was greater than 500 Mb
//     // if(fileSize > 5e8) {
//     //     // A method for a true a false from pop-up in the UI
//     // }

//     // Initializing variable to be returned
//     var textToLoad = "";

//     // // (Not sure how to indicate that this file is the activeFile since this is only local.)
//     // var activeFile = filePath;
 
//     // // TODO needs to fix this part to get content from text file
//     // var textFileToLoad = filePath.target.files[0];
//     // // Read from file and store in a string
//     // var fileReader = new FileReader();
//     // fileReader.onload = function(fileLoadedEvent) 
//     // {
//     //     textToLoad = fileLoadedEvent.target.result;
//     // };
    
//     textToLoad = fs.readFileSync(filePath, 'utf8');

//     return textToLoad.toString();
// }

/**
 * Function that returns the content from the user's selected file
 *
 * @param {type} filePath           file path of the user's selected file
 */
 export const openFile = (filePath) => {
    
    //var file = filePath.target.files[0];

    // Getting the extension of the file
    var fileExtension = filePath.split('.').pop();
    
    // (Currently only accepting plain text files)
    // If it's not a plain text file, throw error
    if(!(fileExtension == "txt")) {
        throw Error("Invalid file type.");
    }

    // Initializing variable to be returned
    var textToLoad = "";
    
    //textToLoad = fs.readFileSync('src/backend/FileManager/ButterflyTest.txt', 'utf8');
    textToLoad = fs.readFileSync(filePath, 'utf8');

    return textToLoad.toString();
}