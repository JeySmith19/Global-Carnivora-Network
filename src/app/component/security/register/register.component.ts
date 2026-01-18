import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistroService } from 'src/app/service/security/registro.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  loading: boolean = false;
  passwordVisible: boolean = false;
  successMessage: string = '';  // Mensaje de éxito
  errorMessage: string = '';    // Mensaje de error

  constructor(
    private fb: FormBuilder,
    private registroService: RegistroService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', Validators.required],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(15)]],
      city: ['', Validators.required],
    }, { validator: this.passwordMatchValidator });
  }

  // Valida que password y confirmPassword sean iguales
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  togglePassword() {
    this.passwordVisible = !this.passwordVisible;
  }

  registrar() {
  this.successMessage = '';
  this.errorMessage = '';

  if (this.form.valid) {
    this.loading = true;
    const registro = {
      id: 0,
      username: this.form.value.username,
      password: this.form.value.password,
      roles: ['USER'],
      name: this.form.value.name,
      lastName: this.form.value.lastName,
      phone: this.form.value.phone,
      city: this.form.value.city
    };

    this.registroService.insert(registro).subscribe(
      (data) => {
        this.loading = false;
        this.successMessage = data.message || 'Registro exitoso';
        this.form.reset();

        // Redirigir al login después de 2 segundos
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      (error) => {
        this.loading = false;
        this.errorMessage = error.error?.message || 'Ocurrió un error';
      }
    );
  } else {
    this.errorMessage = 'Por favor completa todos los campos correctamente.';
  }
}

}
