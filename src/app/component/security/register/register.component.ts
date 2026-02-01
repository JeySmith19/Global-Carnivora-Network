import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistroService } from 'src/app/service/security/registro.service';
import { COUNTRIES, Country, Region } from './location-data';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  loading: boolean = false;
  passwordVisible: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';
  countries: Country[] = COUNTRIES;
  selectedRegions: Region[] = [];
  selectedCities: string[] = [];
  countryCode: string = '';

  constructor(
    private fb: FormBuilder,
    private registroService: RegistroService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      confirmEmail: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', Validators.required],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
      country: ['', Validators.required],
      department: ['', Validators.required],
      city: [''],
      acceptTerms: [false, Validators.requiredTrue] // <-- validación de términos
    }, { validators: [this.passwordMatchValidator, this.emailMatchValidator] });
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  emailMatchValidator(control: AbstractControl): ValidationErrors | null {
    const email = control.get('username')?.value;
    const confirmEmail = control.get('confirmEmail')?.value;
    return email === confirmEmail ? null : { emailMismatch: true };
  }

  togglePassword() {
    this.passwordVisible = !this.passwordVisible;
  }

  onCountryChange() {
    const country = this.countries.find(c => c.name === this.form.value.country);
    this.selectedRegions = country ? country.regions : [];
    this.selectedCities = [];
    this.countryCode = country ? country.code : '';
    this.form.patchValue({ department: '', city: '' });
  }

  onDepartmentChange() {
    const dept = this.selectedRegions.find(d => d.name === this.form.value.department);
    this.selectedCities = dept ? dept.mainCities : [];
    this.form.patchValue({ city: '' });
  }

  registrar() {
    this.successMessage = '';
    this.errorMessage = '';

    if (this.form.invalid) {
      this.errorMessage = 'Por favor completa todos los campos correctamente.';
      return;
    }

    const emailConfirmado = this.form.value.username;
    const mensajeConfirmacion = `Por favor confirma tu correo:\n\n${emailConfirmado}\n\nSi el correo está mal escrito, no podrás recuperar tu cuenta. ¿Es correcto?`;

    if (!confirm(mensajeConfirmacion)) {
      return;
    }

    this.loading = true;
    const formattedPhone = `+${this.countryCode}${this.form.value.phone.replace(/\D/g, '')}`;
    const formattedCity = this.form.value.city 
      ? `${this.form.value.city}, ${this.form.value.department}, ${this.form.value.country}` 
      : `${this.form.value.department}, ${this.form.value.country}`;

    const registro = {
      id: 0,
      username: this.form.value.username,
      password: this.form.value.password,
      roles: ['USER'],
      name: this.form.value.name,
      lastName: this.form.value.lastName,
      phone: formattedPhone,
      city: formattedCity
    };

    this.registroService.insert(registro).subscribe(
      (data) => {
        this.loading = false;
        this.successMessage = data.message || 'Registro exitoso';
        this.form.reset();
        this.selectedRegions = [];
        this.selectedCities = [];
        this.countryCode = '';
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      (error) => {
        this.loading = false;
        this.errorMessage = error.error?.message || 'Ocurrió un error';
      }
    );
  }

  cancelarRegistro() {
    this.router.navigate(['login']);
  }
}
