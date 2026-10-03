import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  template: `
    <section class="mx-auto w-full max-w-3xl px-4 py-10 md:px-8">
      <h1 class="text-3xl font-bold">Olá, eu sou o Filoroch.</h1>
      <p class="mt-2 text-lg opacity-80">
        Este é meu blogfolio — portfolio + blog.
      </p>
      <a class="mt-6 inline-block rounded border px-4 py-2" routerLink="/blog">
        Ler o blog
      </a>
    </section>
  `,
})
export default class HomePage {}
