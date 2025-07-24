import express from 'express';
import puppeteer from 'puppeteer';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// Simple template renderer
const renderTemplate = (template, data) => {
    let output = template;
    for (const key in data) {
        const regex = new RegExp(`{{${key}}}`, 'g');
        output = output.replace(regex, data[key] || '');
    }
    return output;
};

app.post('/api/generate-pdf', async (req, res) => {
    try {
        const { htmlTemplate, jsonData } = req.body;

        if (!htmlTemplate || !jsonData) {
            return res.status(400).send('Missing htmlTemplate or jsonData');
        }

        const data = JSON.parse(jsonData);
        const bodyContent = renderTemplate(htmlTemplate, data);
        
        const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
        const page = await browser.newPage();
        
        await page.setContent(bodyContent, { waitUntil: 'networkidle0' });

        const headerImage = fs.readFileSync(path.join(__dirname, 'public', 'header.png'), 'base64');
        const footerImage = fs.readFileSync(path.join(__dirname, 'public', 'footer.png'), 'base64');

        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
            displayHeaderFooter: true,
            margin:0,
            padding:0,
            headerTemplate: `
                <div style="width: 100%; text-align: center;margin:0px; padding:0px; overflow:hidden">
                    <img src="data:image/png;base64,${headerImage}" style="width: 100%; height: auto; margin-top: -10px">
                </div>
            `,
            footerTemplate: `
                <div style="width: 100%; text-align: center; font-size: 8px; color: #555; overflow:hidden">
                    <p>Page <span class="pageNumber"></span> of <span class="totalPages"></span></p>
                    <img src="data:image/png;base64,${footerImage}" style="width: 100%; height: auto; margin-bottom: -10px">
                </div>
            `,
            margin: {
                top: '150px', // Increased to accommodate taller header
                bottom: '120px', // Increased to accommodate taller footer
                left: '20px',
                right: '20px'
            },
        });

        await browser.close();

        res.setHeader('Content-Type', 'application/pdf');
        res.send(pdfBuffer);

    } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).send(`Error generating PDF: ${error.message}`);
    }
});

app.listen(port, () => {
    console.log(`PDF generation server listening at http://localhost:${port}`);
});
