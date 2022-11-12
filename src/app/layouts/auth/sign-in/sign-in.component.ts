import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { AuthserviceService } from 'src/app/services/authservice.service';

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.css"],
})
export class SignInComponent implements OnInit {
  signinForm!: FormGroup;
  submitted = false;
  fieldTextType = false;
  isChecked: any;
  constructor(
    public router: Router,
    public fb: FormBuilder,
    private authservice: AuthserviceService
  ) {}

  ngOnInit(): void {
    this.signinForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });
  }
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
  get f() {
    return this.signinForm.controls;
  }

  onSubmit(): void {
    this.isChecked = localStorage.getItem("checked");
    if (!this.isChecked) {
      this.authservice.successMessage(environment.checkboxMessage, "error");

      return;
    }
    let role = "User";
    const { email, password } = this.signinForm.value;
    let obj = { email: email, password: password, role: role };
    this.authservice.login(obj).subscribe(
      (response: any) => {
        console.log("userres", response);
        localStorage.setItem("token", response.token);
        this.router.navigate(["/"]);
      },
      (error) => {
        console.log("error", error);
      }
    );
  }
}

