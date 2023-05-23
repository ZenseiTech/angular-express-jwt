import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ApiService } from "../api.service";
import { Contact } from '../contact';

@Component({
  selector: 'app-contact-create',
  templateUrl: './contact-create.component.html',
  styleUrls: ['./contact-create.component.css']
})
export class ContactCreateComponent implements OnInit {

  public contactForm = new FormGroup({
    firstName: new FormControl("", [Validators.required]),
    lastName: new FormControl("", [Validators.required]),
    email: new FormControl("",
      [Validators.required,
      Validators.pattern('[a-zA-z0-9_\.]+@[a-zA-Z]+\.[a-zA-Z]+')]),
    phone: new FormControl("", [Validators.pattern('[0-9]+')]),
    city: new FormControl(),
    country: new FormControl(),
    title: new FormControl()
  });

  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }
  get email() {
    return this.contactForm.get("email");
  }
  get phone() {
    return this.contactForm.get("phone");
  }
  public onSubmit() {
    console.log(this.contactForm.value);
    const contact = new Contact();
    contact.city = this.contactForm.value.city;
    contact.lastName = this.contactForm.value.lastName!;
    contact.firstName = this.contactForm.value.firstName!;
    contact.email = this.contactForm.value.email!;
    contact.phone = this.contactForm.value.phone!;
    contact.country = this.contactForm.value.country;
    contact.title = this.contactForm.value.title;

    this.apiService.createContact(contact).subscribe((res) => {
      alert("Successfully created!");
      this.contactForm.reset();
    }, (err) => {
      alert("Error");
      console.log(err);
      this.contactForm.reset();
    });
  }

}