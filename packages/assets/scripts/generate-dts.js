/**
 * 타입 정의 파일을 생성합니다.
 * tsup이 SVG import를 처리하지 못하므로, 타입 정의를 수동으로 생성합니다.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const srcIndexPath = path.join(__dirname, '../src/index.ts');
const srcViteEnvPath = path.join(__dirname, '../src/vite-env.d.ts');
const distIndexDtsPath = path.join(__dirname, '../dist/index.d.ts');
const distIndexDctsPath = path.join(__dirname, '../dist/index.d.cts');

// src/index.ts를 읽어서 타입 정의 생성
const content = fs.readFileSync(srcIndexPath, 'utf8');
const viteEnvContent = fs.readFileSync(srcViteEnvPath, 'utf8');

// ReactComponent export를 타입 정의 형식으로 변환
// export { ReactComponent as Name } from './graphics/file.svg';
// -> export declare const Name: React.FC<React.SVGProps<SVGSVGElement>>;
const exportsContent = content
  .split('\n')
  .map((line) => {
    // ReactComponent export 패턴 매칭
    const reactComponentMatch = line.match(/export\s+{\s+ReactComponent\s+as\s+(\w+)\s+}\s+from\s+['"](.+?)['"];?/);
    if (reactComponentMatch) {
      const componentName = reactComponentMatch[1];
      return `export declare const ${componentName}: React.FC<React.SVGProps<SVGSVGElement>>;`;
    }
    
    // ?react 쿼리 패턴도 지원 (이전 형식)
    if (line.includes('?react')) {
      const match = line.match(/export\s+{\s+default\s+as\s+(\w+)\s+}/);
      if (match) {
        const componentName = match[1];
        return `export declare const ${componentName}: React.FC<React.SVGProps<SVGSVGElement>>;`;
      }
    }
    
    return line;
  })
  .filter((line) => {
    // 빈 줄이나 주석이 아닌 export 선언만 포함
    const trimmed = line.trim();
    return trimmed && !trimmed.startsWith('//') && !trimmed.startsWith('/*');
  })
  .join('\n');

// 타입 정의 파일 내용 조합: vite-env 참조 + React import + exports
const dtsContent = `${viteEnvContent.trim()}\n\nimport type React from 'react';\n\n${exportsContent}\n`;

// dist 디렉토리가 없으면 생성
const distDir = path.dirname(distIndexDtsPath);
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// .d.ts 파일 생성
fs.writeFileSync(distIndexDtsPath, dtsContent, 'utf8');

// .d.cts 파일 생성 (CommonJS용)
fs.writeFileSync(distIndexDctsPath, dtsContent, 'utf8');

console.log('Type definitions generated successfully');

