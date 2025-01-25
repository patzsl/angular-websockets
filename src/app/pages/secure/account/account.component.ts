import { Component, effect } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { currentUser } from '../../../signals/user';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css',
})
export class AccountComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = fb.group({
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      password_confirm: '',
    });

    effect(() => {
      this.form.patchValue({
        first_name: currentUser()?.first_name,
        last_name: currentUser()?.last_name,
        email: currentUser()?.email,
      });
    });
  }

  submit() {
    this.authService
      .update(this.form.getRawValue())
      .subscribe((response: any) => {
        currentUser.set(response);
        this.router.navigate(['/']);
      });
  }
}
