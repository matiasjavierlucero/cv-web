import puppeteer from 'puppeteer';
import { createServer } from 'vite';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT = resolve(__dirname, '../public/Matias_Javier_Lucero_CV.pdf');
const ROOT   = resolve(__dirname, '..');

const server = await createServer({ root: ROOT, server: { port: 5174 } });
await server.listen();

const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

const page = await browser.newPage();
await page.goto('http://localhost:5174/?print', { waitUntil: 'networkidle0' });
await page.pdf({
    path: OUTPUT,
    format: 'A4',
    printBackground: true,
    displayHeaderFooter: false,
    margin: { top: 0, bottom: 0, left: 0, right: 0 },
});

await browser.close();
await server.close();
console.log(`✓ PDF generado en: ${OUTPUT}`);
