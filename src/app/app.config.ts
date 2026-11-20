import { provideContent, withMarkdownRenderer } from '@analogjs/content';
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideFileRouter } from '@analogjs/router';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideFileRouter(), // ativa o roteamento de paginas com base em hierarquia de arquivos
    provideHttpClient(withFetch()),
    provideContent(withMarkdownRenderer()), // permite prover conteudo em markdown na pagina usando file based routes
  ],
};