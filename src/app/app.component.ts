import {Component, OnInit} from '@angular/core';
import {UsersService} from "./services/users.service";
import {FilesService} from "./services/files.service";
import {AuthService} from "./services/auth.service";
import {TokenService} from "./services/token.service";

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'myStory';
  imgRta = '';

  constructor(
    private authService:AuthService,
    private tokenService:TokenService,
    private usersService: UsersService,
    private fileService: FilesService) {
  }

ngOnInit() {
    const token=this.tokenService.getToken();
    if(token){
      this.authService.profile().subscribe();
    }
}


  createUser() {
    this.usersService.create({
      email: 'test5@test5.com',
      password: '12345678',
      name: 'Kevin',
      role: 'admin'
    }).subscribe(data => {
      console.log(data);
    })
  }


  downloadPdf() {
    this.fileService.getFile('my.pdf', 'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf', 'application/pdf')
      .subscribe(respose => console.log(respose))
  }

  onUpload(event: Event) {
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if (file) {
      this.fileService.uploadFile(file).subscribe((res) => {
        this.imgRta = res.location;
      })
    }

  }
}
