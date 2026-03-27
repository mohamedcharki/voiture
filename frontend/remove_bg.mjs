import { removeBackground } from '@imgly/background-removal-node';
import fs from 'fs';

const inputImagePath = "file:///C:/Users/cherQui%20zo4bi/.gemini/antigravity/brain/17a29e75-fe49-4833-8336-78dfd7cd20d5/media__1774638626265.jpg";
const outputImagePath = "public/logo-nobg.png";

async function main() {
  console.log("Removing background...");
  try {
    const rawData = fs.readFileSync("C:/Users/cherQui zo4bi/.gemini/antigravity/brain/17a29e75-fe49-4833-8336-78dfd7cd20d5/media__1774638626265.jpg");
    const blobImage = new Blob([rawData], { type: 'image/jpeg' });
    
    // Passing a Blob object is usually safe from protocol issues.
    const blob = await removeBackground(blobImage, {
      debug: false,
      output: { format: 'image/png' }
    });
    
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    fs.writeFileSync(outputImagePath, buffer);
    console.log("Success! File saved to " + outputImagePath);
  } catch (error) {
    console.error("Failed to remove background:", error);
  }
}

main();
