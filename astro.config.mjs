// @ts-check
import { defineConfig } from 'astro/config';
import fs from 'fs';
import path from 'path';

// Parse constants.ts to dynamically extract siteUrl for correct site & base path configuration
const constantsContent = fs.readFileSync(path.resolve('./src/constants.ts'), 'utf-8');
const siteUrlMatch = constantsContent.match(/siteUrl:\s*["']([^"']+)["']/);
const siteUrl = siteUrlMatch ? siteUrlMatch[1] : '';

let site = 'https://stefanleon17.github.io';
let base = '/portfolio/';

if (siteUrl) {
  try {
    const url = new URL(siteUrl);
    site = url.origin;
    base = url.pathname;
    if (!base.endsWith('/')) {
      base += '/';
    }
  } catch (e) {
    console.error('Error parsing siteUrl from constants.ts:', e);
  }
}

// https://astro.build/config
export default defineConfig({
  site,
  base,
});

