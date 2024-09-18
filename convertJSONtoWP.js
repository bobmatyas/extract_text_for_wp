const fs = require('fs');
const path = require('path');

// Function to convert JSON to WordPress import file (WXR)
function convertJsonToWpImport(jsonFilePath, outputFilePath) {
    // Read the JSON file
    const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));

    // Start building the WXR XML structure
    let wxrContent = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
     xmlns:excerpt="http://wordpress.org/export/1.2/excerpt/"
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:wfw="http://wellformedweb.org/CommentAPI/"
     xmlns:dc="http://purl.org/dc/elements/1.1/"
     xmlns:wp="http://wordpress.org/export/1.2/"
>
<channel>
  <title>Imported Posts</title>
  <link>http://example.com</link>
  <description>Posts imported from JSON</description>
  <pubDate>${new Date().toUTCString()}</pubDate>
  <language>en-US</language>
`;

    // Process each item in the JSON data
    jsonData.forEach(item => {
        const title = path.basename(item.imagePath, path.extname(item.imagePath)); // Use filename as title
        const content = item.text;
        const imageUrl = item.imagePath; // Use the image path as the URL for the featured image

        wxrContent += `
  <item>
    <title>${title}</title>
    <link>http://example.com/${title.replace(/\s+/g, '-').toLowerCase()}</link>
    <pubDate>${new Date().toUTCString()}</pubDate>
    <dc:creator><![CDATA[admin]]></dc:creator>
    <guid isPermaLink="false">http://example.com/?p=${title.replace(/\s+/g, '-').toLowerCase()}</guid>
    <description></description>
    <content:encoded><![CDATA[${content}]]></content:encoded>
    <excerpt:encoded><![CDATA[]]></excerpt:encoded>
    <wp:status>draft</wp:status>
    <wp:post_type>post</wp:post_type>
    <wp:postmeta>
      <wp:meta_key><![CDATA[_thumbnail_id]]></wp:meta_key>
      <wp:meta_value><![CDATA[${imageUrl}]]></wp:meta_value>
    </wp:postmeta>
  </item>
`;
    });

    // Close the WXR XML structure
    wxrContent += `
</channel>
</rss>`;

    // Write the WXR content to the output file
    fs.writeFileSync(outputFilePath, wxrContent);
    console.log(`WordPress import file created: ${outputFilePath}`);
}

// Main function to run the script
function main() {
    const jsonFilePath = './results.json'; // Change this to your JSON file path
    const outputFilePath = './wordpress-import.xml'; // Output WXR file path

    convertJsonToWpImport(jsonFilePath, outputFilePath);
}

// Run the main function
main();
