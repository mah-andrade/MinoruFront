import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Credencias } from 'src/app/models/credenciais';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  hide = true;
  creds: Credencias = {
    email: '',
    senha: '',
  };

  email = new FormControl(null, Validators.email);
  senha = new FormControl(null, Validators.minLength(3));

  constructor(
    private authService: AuthService,
    private router: Router,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {}

  validaCampos(): boolean {
    if (this.email.valid && this.senha.valid) {
      return true;
    } else {
      return false;
    }
  }

  logar() {
    this.authService.login(this.creds.email, this.creds.senha).subscribe(
      () => {
        this.router.navigate(['home']);
      },
      (err) => {
        this.toast.error('Usuário e/ou senha inválidos!', 'Login');
        this.creds.senha = '';
      }
    );
  }
}
