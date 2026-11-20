import { Component, computed } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { injectContentFiles } from '@analogjs/content';
import { PostAttributes } from '../../core/blog/post-attributes.model';

@Component({
  imports: [DatePipe, RouterLink],
  template: `
    <section class="mx-auto w-full max-w-3xl px-4 py-10 md:px-8">
      <h1 class="text-3xl font-bold">Blog</h1>

      @if (posts().length > 0) {
        <ul class="mt-8 flex flex-col gap-6">
          @for (post of posts(); track post.slug) {
            <li class="rounded border p-4">
              <a [routerLink]="['/blog', post.slug]">
                <time
                  class="text-sm text-gray-600"
                  [attr.datetime]="post.attributes.publishedAt"
                >
                  {{ post.attributes.publishedAt | date: 'dd/MM/yyyy' : 'UTC' }}
                </time>
                <h2 class="mt-1 text-xl font-bold">{{ post.attributes.title }}</h2>
                <p class="mt-1 text-gray-700">{{ post.attributes.description }}</p>
              </a>
            </li>
          }
        </ul>
      } @else {
        <p class="mt-8 text-gray-700">Nenhum post publicado ainda.</p>
      }
    </section>
  `,
})
export default class BlogIndexPageComponent {
  private readonly files = injectContentFiles<PostAttributes>();

  readonly posts = computed(() =>
    [...this.files].sort(
      (a, b) =>
        new Date(b.attributes.publishedAt).getTime() -
        new Date(a.attributes.publishedAt).getTime(),
    ),
  );
}
