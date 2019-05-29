import { Component, OnInit } from '@angular/core';
import { Credentials } from '@app/core/models/Credentials';
import { User } from '@app/core/models/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userCredential: Credentials = {} as Credentials;
  user: User = {} as User;

  constructor() {
    this.userCredential = JSON.parse(sessionStorage.getItem('credentials'));
  }

  ngOnInit() {}
}
