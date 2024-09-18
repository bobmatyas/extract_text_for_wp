const fs = require('fs');
const path = require('path');
const Tesseract = require('tesseract.js');

// Function to scan a directory and extract text from images
async function extractTextFromImages(directory) {
    const results = [];

    // Read all files in the directory
    const files = fs.readdirSync(directory);

    // Process each file
    for (const file of files) {
        const filePath = path.join(directory, file);
        const fileExtension = path.extname(file).toLowerCase();

        // Check if the file is an image (you can add more extensions if needed)
        if (['.png', '.jpg', '.jpeg', '.gif', '.webp'].includes(fileExtension)) {
            try {
                // Use Tesseract to recognize text in the image
                const { data: { text } } = await Tesseract.recognize(filePath, 'eng');
                
                // Push the result to the results array
                results.push({
                    imagePath: filePath,
                    text: text.trim()
                });
            } catch (error) {
                console.error(`Error processing file ${filePath}:`, error);
            }
        }
    }

    return results;
}

// Main function to run the script
async function main() {
    const directory = './images'; // Change this to your images directory
    const outputFile = 'results.json';

    const results = await extractTextFromImages(directory);

    // Save results to a JSON file
    fs.writeFileSync(outputFile, JSON.stringify(results, null, 2));
    console.log(`Results saved to ${outputFile}`);
}

// Run the main function
main().catch(console.error);
