import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './secure.component.html',
  styleUrl: './secure.component.css',
})
export class SecureComponent {}
