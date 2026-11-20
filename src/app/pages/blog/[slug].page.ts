import { Component, computed, effect, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { injectContent, MarkdownComponent } from '@analogjs/content';
import { toSignal } from '@angular/core/rxjs-interop';
import { PostAttributes } from '../../core/blog/post-attributes.model';

const SITE_TITLE = 'Meu Blog';

@Component({
  imports: [DatePipe, RouterLink, MarkdownComponent],
  template: `
    @if (resolvedPost(); as post) {
      <section class="mx-auto w-full max-w-3xl px-4 py-10 md:px-8">
        <header class="mb-10 border-b pb-8">
          <time
            class="text-sm text-gray-600"
            [attr.datetime]="post.attributes.publishedAt"
          >
            {{ post.attributes.publishedAt | date: 'dd/MM/yyyy' : 'UTC' }}
          </time>
          <h1 class="mt-2 text-4xl font-bold">{{ post.attributes.title }}</h1>
          <p class="mt-2 text-lg text-gray-700">
            {{ post.attributes.description }}
          </p>
          @if (post.attributes.categories.length > 0) {
            <ul aria-label="Categorias" class="mt-4 flex flex-wrap gap-2">
              @for (category of post.attributes.categories; track category) {
                <li class="rounded border px-2 py-1 text-sm">{{ category }}</li>
              }
            </ul>
          }
        </header>

        <article class="prose max-w-none">
          <analog-markdown [content]="post.content"></analog-markdown>
        </article>
      </section>
    } @else {
      <section class="mx-auto w-full max-w-3xl px-4 py-10 md:px-8">
        <h1 class="text-2xl font-bold">Post não encontrado</h1>
        <p class="mt-2 text-gray-700">
          Não existe conteúdo para este endereço. Volte para a
          <a class="underline" routerLink="/blog">listagem do blog</a>.
        </p>
      </section>
    }
  `,
})
export default class BlogPostComponent {
  private readonly title = inject(Title);

  /**
   * `injectContent` never emits `undefined`: for an unknown slug it resolves to
   * a truthy placeholder with empty `attributes`. Guarding on the presence of
   * `title` is therefore what actually distinguishes a real post, and keeps the
   * not-found branch reachable.
   */
  readonly post = toSignal(
    injectContent<PostAttributes>({ param: 'slug', subdirectory: 'posts' }),
  );

  /** `undefined` means "no post for this slug". */
  readonly resolvedPost = computed(() => {
    const content = this.post();

    return content?.attributes?.title ? content : undefined;
  });

  constructor() {
    effect(() => {
      // Reset first: without this the previous post's title sticks to every
      // later navigation in the same SPA session.
      const title = this.resolvedPost()?.attributes.title;

      this.title.setTitle(title ? `${title} | ${SITE_TITLE}` : SITE_TITLE);
    });
  }
}