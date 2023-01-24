import {Component} from '@angular/core';
import {OnExit} from "../../../guards/exit.guard";
import {Observable} from "rxjs";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnExit {
  onExit() {
    return confirm('Logica desde componente, estas seguro salir?');
  }

}
