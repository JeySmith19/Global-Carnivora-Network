import { Component } from '@angular/core';

@Component({
  selector: 'app-volver',
  templateUrl: './volver.component.html',
  styleUrls: ['./volver.component.css']
})
export class VolverComponent {

  volver() {
  history.back();
}

}
