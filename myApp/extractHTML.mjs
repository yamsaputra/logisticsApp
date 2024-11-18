import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parseComponent } from 'vue-template-compiler';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const componentsDir = path.resolve(__dirname, 'src/views');
const outputDir = path.resolve(__dirname, 'dist/html');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.readdirSync(componentsDir).forEach(file => {
  if (path.extname(file) === '.vue') {
    const filePath = path.join(componentsDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const parsed = parseComponent(content);

    if (parsed.template) {
      const htmlContent = parsed.template.content;
      const outputFilePath = path.join(outputDir, `${path.basename(file, '.vue')}.html`);
      fs.writeFileSync(outputFilePath, htmlContent, 'utf-8');
      console.log(`Generated ${outputFilePath}`);
    }
  }
});