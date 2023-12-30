const fs = require('fs');

// Check if the required arguments are provided
if (process.argv.length !== 4) {
  console.error('Usage: node script.js <input_file_path> <output_file_path>');
  process.exit(1);
}

const inputFilePath = process.argv[2];
const outputFilePath = process.argv[3];

// Load data from the input file
const inputData = fs.readFileSync(inputFilePath);
const jsonData = JSON.parse(inputData);

// Define the pattern to extract the rank and category or gender
const pattern = /(\w+)\s\((\d+)\.\)/;

// Function to convert the data format
function convertData(inputData) {
  return inputData.map((entry) => {
    const matchesGender = entry[4]?.match(pattern);
    const matchesCategory = entry[5]?.match(pattern);
    return {
      bibNumber: entry[2],
      time: entry[10],
      rank: entry[1].split('.')[0],
      name: entry[3],
      gender: {
        position: parseInt(matchesGender?.[2]),
        category: matchesGender?.[1],
      },
      category: {
        position: parseInt(matchesCategory?.[2]),
        name: matchesCategory?.[1],
      },
      countryCode: entry[7]?.match(/\w+/)?.[0],
    };
  });
}

// Convert the data
const convertedData = convertData(jsonData);

// Write the converted data to a new file
fs.writeFileSync(outputFilePath, JSON.stringify(convertedData, null, 2));

console.log(
  `Conversion completed. The converted data has been saved to "${outputFilePath}".`
);
