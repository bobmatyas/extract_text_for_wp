# Extract Text from Images and Import as Posts in WordPress

## To Use

### Extract Text

1. Place images in `./images`
2. Run `node extractText.js`
3. This generates a `results.json` file containing the image path and the extracted text

### Convert JSON File to WordPress Import File

1. Run `convertJSONtoWP.js`
2. This will generate a WordPress import file with the post title set as the image name, the image as the featured image, and the extracted text as the post body. All posts will be imported as drafts.