const OpenAI = require('openai');
const Tesseract = require('tesseract.js');

// Initialize OpenAI client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// Extracts text from an image using OCR
async function extractTextFromImage(imageBuffer) {
    try {
        const result = await Tesseract.recognize(
            imageBuffer,
            'jpn',
            {
                logger: m => console.log(m)
            }
        );
        return result.data.text;
    } catch (error) {
        console.error('OCR Error:', error);
        throw new Error('Failed to extract text from image');
    }
}

// Parses receipt text using OpenAI to extract structured data
async function parseReceiptText(text) {
    const prompt = `Parse the following Japanese receipt text and return a JSON object with the following structure. 
    The receipt may contain Japanese text, numbers, and currency symbols (¥). 
    Convert all amounts to numbers (remove ¥ symbol and commas).
    Convert Japanese dates to YYYY-MM-DD format.
    For items, if quantity is not specified, assume it's 1.
    
    {
        "merchant": "store name (in Japanese or English)",
        "date": "YYYY-MM-DD",
        "amount": number,
        "category": (choose one of the following: "Groceries", "Rent", "Utilities", "Insurance", "Transportation", "Dining Out", "Entertainment", "Healthcare", "Personal Care", "Miscellaneous") - based on the listed items on the receipt
    }
    
    Receipt text:
    ${text}`;

    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "system",
                content: "You are a receipt parsing assistant specialized in Japanese receipts. Extract structured data from Japanese receipt text and return it as JSON. Handle both Japanese and English text, and convert all monetary values to numbers."
            },
            {
                role: "user",
                content: prompt
            }
        ],
        response_format: { type: "json_object" }
    });

    return JSON.parse(completion.choices[0].message.content);
}

// Main function to process a receipt image
async function parseReceipt(imageBuffer) {
    try {
        const extractedText = await extractTextFromImage(imageBuffer);
        const parsedData = await parseReceiptText(extractedText);
        return parsedData;
    } catch (error) {
        console.error('Error parsing receipt:', error);
        throw new Error('Failed to parse receipt');
    }
}

module.exports = {
    parseReceipt
}; 