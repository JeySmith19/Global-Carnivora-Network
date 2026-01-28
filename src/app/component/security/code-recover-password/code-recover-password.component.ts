import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/security/auth.service';

@Component({
  selector: 'app-code-recover-password',
  templateUrl: './code-recover-password.component.html',
  styleUrls: ['./code-recover-password.component.css']
})
export class CodeRecoverPasswordComponent implements OnInit {

  form: FormGroup;
  email!: string;
  error: string | null = null;
  success: string | null = null;
  passwordMismatch = false;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      code: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
    });

    this.form.valueChanges.subscribe(() => {
      this.passwordMismatch =
        this.form.value.newPassword !== this.form.value.confirmPassword;
    });
  }

  submit() {
    if (this.form.invalid || this.passwordMismatch || this.loading) return;

    this.loading = true;
    this.error = null;
    this.success = 'Cambio exitoso, espera un momento...';

    this.authService.resetPassword(
      this.email,
      this.form.value.code,
      this.form.value.newPassword
    ).subscribe({
      next: () => {
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: () => {
        this.loading = false;
        this.success = null;
        this.error = 'Código inválido o expirado';
      }
    });
  }
}