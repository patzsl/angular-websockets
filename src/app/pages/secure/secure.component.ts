import { Component, computed, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { currentUser } from '../../signals/user';

@Component({
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './secure.component.html',
  styleUrl: './secure.component.css',
})
export class SecureComponent implements OnInit {
  full_name = computed(
    () => `${currentUser()?.first_name} ${currentUser()?.last_name}`
  );
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.user().subscribe({
      next: (response: any) => {
        currentUser.set(response);
      },
      error: (err) => {
        currentUser.set(null);
        this.router.navigate(['/login']);
      },
    });
  }

  protected readonly currentUser = currentUser;
}
