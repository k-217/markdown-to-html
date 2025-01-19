// HTML DOM (Document Object Model): With the object model, JavaScript gets all the power it needs to create dynamic HTML!

// Event listener (listens from a input in textarea with id = "markdownInput")
document.getElementById("markdownInput").addEventListener("input", function () {

  const markdownText = this.value; // this -> DOM element that triggered the event, i.e. markdownInput
  
  // Converts Markdown to HTML using marked.js library
  const htmlContent = marked.parse(markdownText);

  // Updates the preview
  document.getElementById("Preview").innerHTML = htmlContent;

  // Displays the HTML code alongside the preview
  document.getElementById("htmlCode").value = htmlContent;
});
  
// HTML functionality (listens from a click on button with id = "downloadButton")
document.getElementById("downloadButton").addEventListener("click", function () {
  
  // Gets the HTML code from the HTML Code textarea
  const htmlContent = document.getElementById("htmlCode").value;

  // Wraps the HTML content in a proper HTML structure
  const completeHtml = `
    <!DOCTYPE html>
    <html lang = "en">
    <head>
      <meta charset = "UTF-8">
      <meta name = "viewport" content = "width = device-width, initial-scale = 1.0">
      <title> Markdown-to-HTML </title>
    </head>
    <body>
      ${htmlContent}
    </body>
    </html>
  `;

  // Creates a Blob for the HTML content
  const blob = new Blob([completeHtml], { type: "text/html" }); // Binary Large Object: file-like object of immutable, raw data; they can be read as text or binary data

  // Creates a downloadable URL
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a"); // Creates a temporary link element in the document, i.e. webpage
  link.href = url;
  link.download = "markdown-to-html.html"; // Sets the file name
  link.click(); // Triggers the download
  URL.revokeObjectURL(url); // Releases memory and cleans up the URL object
});

// Toggles theme from light to dark and vice-versa
function toggleTheme() {
  const body = document.body;
  const currentTheme = body.getAttribute('data-theme');
  body.setAttribute('data-theme', currentTheme === 'dark' ? 'light' : 'dark');
}