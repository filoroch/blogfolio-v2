import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GlobalHeaderComponent } from './shared/components/header';

@Component({
  imports: [RouterOutlet, GlobalHeaderComponent],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('blogfolio');
}
