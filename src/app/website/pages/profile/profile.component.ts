import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {User} from "../../../model/user.model";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})


export class ProfileComponent implements OnInit {
  user: User | null = null;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.profile().subscribe(user => {
      this.user = user;
    });
  }

}
