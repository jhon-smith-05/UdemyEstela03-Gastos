import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import 'dayjs/locale/es';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  
  hora:any;
  fecha:any;
  ngOnInit(): void {
    this.getHoraActual();
    this.fecha = Date();
   
  }

  getHoraActual()
  {
    this.hora = new Date();
    setInterval(() => {
      this.hora = new Date();
      }, 1000
    );
  }

}
