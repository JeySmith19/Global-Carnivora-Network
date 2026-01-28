import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/security/auth.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css']
})
export class RecoverPasswordComponent {

  form: FormGroup;
  message: string | null = null;
  error: string | null = null;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  submit() {
    if (this.form.invalid || this.loading) return;

    this.loading = true;

    this.authService.requestPasswordReset(this.form.value.email).subscribe({
      next: () => {
        this.message = 'Código enviado al correo.';
        this.error = null;
        this.loading = false;
        this.router.navigate(['/code-reset'], {
          queryParams: { email: this.form.value.email }
        });
      },
      error: () => {
        this.error = 'No se pudo enviar el correo.';
        this.message = null;
        this.loading = false;
      }
    });
  }
}