import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
    public signupForm: FormGroup;
    public errorMessage: String;
    public showSpinner: boolean = false;
    constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router, private tokenService: TokenService) { }

    ngOnInit() {
        this.init();
    }

    init() {
        this.signupForm = this.formBuilder.group({
            username: ['', Validators.required],
            email: ['', [Validators.email, Validators.required]],
            password: ['', Validators.required]
        });
    }

    signupUser() {
        console.log(this.signupForm.value);
        this.showSpinner = true;
        this.authService.registerUser(this.signupForm.value).subscribe(data => {
            console.log(data);
            this.tokenService.setToken(data.token);
            this.signupForm.reset();
            setTimeout(() => {
                this.router.navigate(['streams']);
            }, 3000)
        }, error => {
            console.log(error);
            this.showSpinner = false;
            if (error.error.msg) {
                this.errorMessage = error.error.msg[0].message;

            }
            if (error.error.message) {
                this.errorMessage = error.error.message;
            }
        });
    }

}
