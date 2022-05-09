import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  form: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {}

  submit() {
    const baseUrl = window.location.origin;
    this.http
      .post(`${baseUrl}/.netlify/functions/signup`, this.form.value)
      .subscribe({
        next: (res: any) => {
          alert(res.message);
        },
        error: (err) => {
          alert('ERROR: ' + err.error);
        },
      });
  }
}
