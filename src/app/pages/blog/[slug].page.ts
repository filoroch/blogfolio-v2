import { Component, effect, inject } from '@angular/core'; // Adicionado o inject
import { Title } from '@angular/platform-browser'; // 1. Importação do Title
import { AsyncPipe, DatePipe } from '@angular/common';
import { injectContent, MarkdownComponent } from '@analogjs/content';
import { toSignal } from '@angular/core/rxjs-interop'; // 2. Importação oficial do toSignal
import { PostAttributes } from '../../core/blog/post-attributes.model';

@Component({
  imports: [AsyncPipe, DatePipe, MarkdownComponent],
  template: `
    @if (post$ | async; as post) {
      <section class="p-16">
        @if (post.attributes.title) {
          <header class="mb-10 border-bp">
            <time>{{ post.attributes.publishedAt | date: 'dd/MM/yyyy' }}</time>
            <h1 class="text-4xl font-bold">{{ post.attributes.title }}</h1>
            <p class="mt-2 mr-86 text-lg text-justify opacity-80">{{ post.attributes.description }}</p>
            <ul class="mt-2 flex gap-2">
              @for (category of post.attributes.categories; track category) {
                <li class="rounded border px-2 py-1 text-sm">{{ category }}</li>
              }
            </ul>
          </header>
        } @else {
          <p>Post não encontrado para este slug.</p>
        }
        
        <article class="prose">
          <analog-markdown [content]="post.content"></analog-markdown>
        </article>
      </section>
    }
  `,
})
export default class BlogPostComponent {
  // 3. Injetar o Title service
  private titleService = inject(Title);

  post$ = injectContent<PostAttributes>({ param: 'slug', subdirectory: 'posts' });

  // 4. Usar o toSignal importado
  postSignal = toSignal(this.post$);

  constructor() {
    effect(() => {
      // 5. Ler o valor do Signal invocando a função ()
      const post = this.postSignal(); 

      if (post?.attributes?.title) {
        this.titleService.setTitle(`${post.attributes.title} | Meu Blog`);
      }
    });
  }
}