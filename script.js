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

  // Syntax highlighting
  const preview = document.getElementById("Preview");
  const codeBlocks = preview.querySelectorAll("pre code");
  codeBlocks.forEach((block) => {
    Prism.highlightElement(block);});
}
);
  
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

// Markdown Shortcuts
document.addEventListener('keydown', function (event) {
  const editor = document.getElementById('markdownInput');
  if (event.ctrlKey) {
    switch (event.key) {
      case 'b': // Ctrl + b for Bold
        insertMarkdown(editor, '**', '**');
        break;
      case 'i': // Ctrl + i for Italic
        insertMarkdown(editor, '*', '*');
        break;
      case 'm': // Ctrl + m for Heading
        insertMarkdown(editor, '# ', '');
        break;
      case '~': // Ctrl + ~ for strikethrough
        insertMarkdown(editor, '~', '~');
        break;
      case 'E': // Ctrl + E for horizontal line
        insertMarkdown(editor, '---', '');
        break;
      case 'K': // Ctrl + K for link
        insertMarkdown(editor, '[click-here](', ')');
        break;
      case 'Y': // Ctrl + y for image
        insertMarkdown(editor, '[alt-text](', ')');
        break;
      case 'Q': // Ctrl + Q for table
        insertMarkdown(editor, 'Column1 | Column2 ', '')
        break;
      case 'L': // Ctrl + L for list
        insertMarkdown(editor, '- ', '')
        break;
      case 'q': // Ctrl + q for task checklist
        insertMarkdown(editor, '- [ ] ', '')
        break;
      case '`': // Ctrl + ` for code
        insertMarkdown(editor, '`', '`')
        break;
      case '>':
        insertMarkdown(editor, '> ', '')
        break;
    }
  }
});

function insertMarkdown(editor, before, after) {
  const cursorPos = editor.selectionStart;
  const text = editor.value;
  editor.value = text.slice(0, cursorPos) + before + text.slice(cursorPos) + after;
  editor.setSelectionRange(cursorPos + before.length, cursorPos + before.length); // Move cursor
}