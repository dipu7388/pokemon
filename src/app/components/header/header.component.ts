import { Component, OnInit, ViewChild } from '@angular/core';
import { AppStateService } from 'src/app/services/app-state.service';
import { Observable } from 'rxjs';

export let socialItemsArray:Array <{name: string, url : string,icon : string}>=[
  {name:'Fork me on Github', icon: 'fa fa-github', url:'https://github.com/dipu7388'},
  {name:'View Profile on Linkedin', icon: 'fa fa-linkedin', url:'https://www.linkedin.com/in/dheerendra-kumar-singh/'},
  {name:'Follow me on Twitter', icon: 'fa fa-twitter', url:'https://twitter.com/dhirend92095087'},
  {name:'Follow me on Facebook', icon: 'fa fa-facebook-f', url:'https://www.facebook.com/dipusingh7388'},
  {name:'Follow me on Instagram', icon: 'fa fa-instagram', url:'https://www.instagram.com/dheeru.1194/'},
];
@Component({
  selector: 'dk-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @ViewChild('menubutton', {static: true}) navside
  menu:Array <{name, url,icon}>=[
  ]
  socialItems= socialItemsArray;

  menuFlag$: Observable<boolean> = this.appStateService.menuObs();
  constructor(
    private appStateService: AppStateService
  ) { }

  ngOnInit() {
  }

  toggle(){
    this.appStateService.toggle()
  }

  open(){
    this.appStateService.open()
  }
  close(){
    this.appStateService.close()
  }

}
