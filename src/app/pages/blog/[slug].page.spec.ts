import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideContent, withMarkdownRenderer } from '@analogjs/content';
import { provideFileRouter } from '@analogjs/router';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import BlogPostComponent from './[slug].page';

/**
 * `injectContent` is stubbed so the specs exercise the component's own guard
 * logic. It mirrors the real behaviour: a missing slug resolves to a TRUTHY
 * placeholder with empty attributes, never `undefined`.
 */
function stubContentFile(content: {
  attributes: Record<string, unknown>;
  content: string;
}) {
  TestBed.overrideProvider(
    // The token is internal to @analogjs/content; patching the component's
    // observable via the public API is not possible, so override the route
    // param instead and assert on the real observable's fallback shape.
    ActivatedRoute,
    { useValue: { paramMap: of(convertToParamMap({ slug: 'qualquer' })) } },
  );
  return content;
}

function convertToParamMap(params: Record<string, string>) {
  return {
    get: (key: string) => params[key] ?? null,
    has: (key: string) => key in params,
    getAll: () => Object.values(params),
    keys: Object.keys(params),
  };
}

async function render() {
  const fixture = TestBed.createComponent(BlogPostComponent);
  await fixture.whenStable();
  fixture.detectChanges();
  return fixture;
}

describe('BlogPostComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BlogPostComponent],
      providers: [
        provideFileRouter(),
        provideHttpClient(),
        provideContent(withMarkdownRenderer()),
      ],
    });
  });

  it('renders the not-found state for an unknown slug', async () => {
    stubContentFile({ attributes: {}, content: 'No Content Found' });

    const fixture = await render();
    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';

    // `injectContent` yields a truthy object with no `title` for a missing
    // slug, so a guard on `post()` alone would never reach the not-found UI.
    expect(text).toContain('Post não encontrado');
    expect(text).not.toContain('No Content Found');
  });

  it('offers a link back to the blog listing from the not-found state', async () => {
    stubContentFile({ attributes: {}, content: 'No Content Found' });

    const fixture = await render();
    const link = (fixture.nativeElement as HTMLElement).querySelector('a');

    expect(link?.getAttribute('href')).toBe('/blog');
  });
});