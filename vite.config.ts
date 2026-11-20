/// <reference types="vitest" />

import { defineConfig } from 'vite';
import analog from '@analogjs/platform';
import {
  isCategory,
  type PostAttributes,
} from './src/app/core/blog/post-attributes.model.ts';

/**
 * Fails the build on malformed frontmatter so a broken post never ships as a
 * silently empty page.
 */
function assertValidAttributes(name: string, attributes: PostAttributes): void {
  const errors: string[] = [];

  if (!attributes?.title) {
    errors.push('`title` is required');
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(attributes?.publishedAt ?? '')) {
    errors.push(
      '`publishedAt` must be a quoted YYYY-MM-DD string (got ' +
        `${JSON.stringify(attributes?.publishedAt)})`,
    );
  }

  if (
    !Array.isArray(attributes?.categories) ||
    attributes.categories.length === 0
  ) {
    errors.push('`categories` must be a non-empty list');
  } else {
    const unknown = attributes.categories.filter(
      (category) => !isCategory(category),
    );
    if (unknown.length > 0) {
      errors.push(`unknown categories: ${unknown.join(', ')}`);
    }
  }

  if (errors.length > 0) {
    throw new Error(
      `Invalid frontmatter in "${name}.md":\n  - ${errors.join('\n  - ')}`,
    );
  }
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    root: import.meta.dirname,
    cacheDir: './node_modules/.vite',
    build: {
      outDir: './dist/client',
      reportCompressedSize: true,
      target: ['es2020'],
    },
    plugins: [
      analog({
        content: { highlighter: 'prism' },
        // `static: true` prerenders to HTML but emits no server output. That
        // render still needs the SSR bundle, so `ssr` must stay enabled — with
        // `ssr: false` the prerenderer only copies the empty index.html shell.
        ssr: true,
        static: true,
        prerender: {
          routes: [
            '/',
            '/blog',
            {
              contentDir: '/src/content/posts',
              transform: (file) => {
                assertValidAttributes(
                  file.name,
                  file.attributes as unknown as PostAttributes,
                );

                return `/blog/${file.name}`;
              },
            },
          ],
        },
      }),
    ],
    server: {
      fs: {
        allow: ['.'],
      },
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['src/test-setup.ts'],
      include: ['src/**/*.spec.ts'],
      reporters: ['default'],
    },
    define: {
      'import.meta.vitest': mode !== 'production',
    },
  };
});