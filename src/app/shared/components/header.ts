import { Component } from "@angular/core";

export interface link { redirect: string, texto: string}

@Component({
  selector: 'global-header',
  template: `
    <header class="bg-linear-to-r from-gray-700 to-black text-white flex justify-center items-center p-4">
      <h2 class="font-pixelify text-3xl tracking-tight mx-4"> Filoroch.</h2>
      <nav class="flex gap-3">
        @for (link of links; track $index) {
          <a
            class="px-2 py-1 rounded-lg border hover:bg-white hover:text-black"
            [href]="link.redirect"
          >{{ link.texto }}</a>
        }
      </nav>
    </header>
  `
})
export class GlobalHeaderComponent {

  private links: link[] = [
    { redirect: '', texto: 'portfolio' },
    { redirect: '', texto: 'blog' },
  ]

}
