/**
 * src/assets/*.svg를 src/index.ts에
 * export SVGName from './assets/svg-name.svg?react' 형식으로 내보내기
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * graph_up_a -> GraphUpA
 * gift_a -> GiftA
 * diamond -> Diamond
 */
function convertPascalCase(str) {
  const withUnderscores = str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
  return withUnderscores.charAt(0).toUpperCase() + withUnderscores.slice(1);
}

function generateExports() {
  const graphicsPath = path.join(__dirname, '../src/graphics');
  const cardsPath = path.join(__dirname, '../src/cards');
  const patternsPath = path.join(__dirname, '../src/patterns');

  const graphics = fs.readdirSync(graphicsPath);
  const cardAssets = fs.existsSync(cardsPath) ? fs.readdirSync(cardsPath) : [];
  const patternAssets = fs.existsSync(patternsPath) ? fs.readdirSync(patternsPath) : [];

  const graphicsExports = graphics.map((asset) => {
    const svgName = convertPascalCase(asset.replace('.svg', ''));
    return `export { default as ${svgName} } from './graphics/${asset}?react';`;
  });

  const cardExports = cardAssets.map((asset) => {
    const baseName = asset.replace('.svg', '');
    const svgName = `Card${convertPascalCase(baseName.replace(/^card-/, '').replace(/-/g, '_'))}`;
    return `export { default as ${svgName} } from './cards/${asset}?react';`;
  });

  const patternExports = patternAssets.map((asset) => {
    const svgName = convertPascalCase(asset.replace('.svg', ''));
    return `export { default as ${svgName} } from './patterns/${asset}?react';`;
  });

  const result = [...graphicsExports, ...cardExports, ...patternExports].join('\n') + '\n'; // add EOL

  fs.writeFileSync(path.join(__dirname, '../src/index.ts'), result, 'utf8');
}

generateExports();
