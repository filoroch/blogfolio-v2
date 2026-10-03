import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface NavLink {
  route: string;
  texto: string;
}

@Component({
  selector: 'global-header',
  imports: [RouterLink],
  template: `
    <header
      class="flex items-center justify-center bg-linear-to-r from-gray-700 to-black p-4 text-white"
    >
      <a
        class="mx-4 text-3xl tracking-tight font-pixelify"
        routerLink="/"
        >Filoroch.</a
      >
      <nav aria-label="Navegação principal" class="flex gap-3">
        @for (link of links; track link.route) {
          <a
            class="rounded-lg border px-2 py-1 hover:bg-white hover:text-black"
            [routerLink]="link.route"
            >{{ link.texto }}</a
          >
        }
      </nav>
    </header>
  `,
})
export class GlobalHeaderComponent {
  public readonly links: readonly NavLink[] = [
    { route: '/', texto: 'portfolio' },
    { route: '/blog', texto: 'blog' },
  ];
}
