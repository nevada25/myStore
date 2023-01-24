import {Component} from '@angular/core'; import {UsersService} from "./services/users.service";
import {FilesService} from "./services/files.service";

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'myStory';
  imgRta = '';

  constructor(
    private usersService: UsersService,
    private fileService: FilesService) {
  }


  createUser() {
    this.usersService.create({
      email: 'test5@test5.com',
      password: '12345678',
      name: 'Kevin'
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
