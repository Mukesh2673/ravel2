import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { environment } from "src/environments/environment";
import { AuthserviceService } from 'src/app/services/authservice.service';
import { GET_MERCHANT_BY_ID, GET_COMMUNITY_BY_ID, GET_HOUSING_BY_ID } from "../../utils/utils";
import Swal from "sweetalert2";


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})

export class ContactComponent implements OnInit {
  contactUsForm!: FormGroup;
  submitted = false;
  regex = "^[a-zA-Z\\s]*$";
  paramObject: any;
  emailTo: any;
  constructor(
    public router: Router,
    public fb: FormBuilder,
    private authservice: AuthserviceService,
    private route: ActivatedRoute
  ) {
    this.paramObject = this.route.snapshot.queryParams;
    console.log(' paramObject: any;', this.paramObject)
  }

  ngOnInit(): void {
    this.contactUsForm = this.fb.group({
      name: ["", [Validators.required, Validators.pattern(this.regex)]],
      email: ["", [Validators.required, Validators.email]],
      message: ["", [Validators.required, Validators.minLength(10)]],
    });

    if (this.paramObject?.keyword === 'businessProfessionals' && this.paramObject?.id) {
      this.authservice.getDetailsById(GET_MERCHANT_BY_ID, { id: this.paramObject.id }).subscribe((res: any) => {
        this.emailTo = res.data.email;

        console.log("businessProfessionals this.emailTo : ", this.emailTo)
        if (this.emailTo == undefined) {
          Swal.fire({
            icon: "error",
            title: "Can't contact now. Contact with administrator.",
            showCloseButton: true,
          })
        }
      });
    }
    else if (this.paramObject?.keyword === 'ministries' && this.paramObject?.id) {
      this.authservice.getDetailsById(GET_COMMUNITY_BY_ID, { id: this.paramObject.id }).subscribe((res: any) => {
        this.emailTo = res.data.email;

        console.log("ministries this.emailTo : ", this.emailTo);
        if (this.emailTo == undefined) {
          Swal.fire({
            icon: "error",
            title: "Can't contact now. Contact with administrator.",
            showCloseButton: true,
          })
        }
      });
    }
    else if (this.paramObject?.keyword === 'housing' && this.paramObject?.id) {
      this.authservice.getDetailsById(GET_HOUSING_BY_ID, { id: this.paramObject.id }).subscribe((res: any) => {
        this.emailTo = res.data.email;

        console.log("housing this.emailTo : ", this.emailTo);
        if (this.emailTo == undefined) {
          Swal.fire({
            icon: "error",
            title: "Can't contact now. Contact with administrator.",
            showCloseButton: true,
          })
        }
      });
    }
    else {
      Swal.fire({
        icon: "error",
        title: "Somethimg went wrong. Please try again.",
      });
    }
  }

  get f() {
    return this.contactUsForm.controls;
  }

  onSubmit(): void {
    if (this.contactUsForm.invalid) {
      this.submitted = true
      return
    }

    let emailObj = {
      name: this.contactUsForm.value.name,
      emailFrom: this.contactUsForm.value.email,
      message: this.contactUsForm.value.message,
      emailTo: this.emailTo,
    }

    this.authservice.contactUsEmail(emailObj).subscribe(
      (response: any) => {
        // this.router.navigate(["/contact-page"]);
        Swal.fire({
          icon: "success",
          title: "Email sent successfully.",
          showCloseButton: true,
        });
        this.contactUsForm.reset();
      },
      (error) => {
        Swal.fire({
          icon: "error",
          title: `${error?.message} ||  Somethimg went wrong. Please try again.`,
          showCloseButton: true,
        });
        this.contactUsForm.reset();
      }
    )
  }
}
