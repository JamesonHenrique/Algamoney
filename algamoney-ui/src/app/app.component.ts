import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FloatLabelModule } from 'primeng/floatlabel';
import {FormsModule} from "@angular/forms";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FloatLabelModule, FormsModule],

  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'algamoney-ui';
}
