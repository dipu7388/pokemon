import { trigger, transition, query, stagger, animate, style } from '@angular/animations';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { distinctUntilKeyChanged, filter } from 'rxjs/operators';
import { HttpService } from 'src/app/services/http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  host: {
    'class': 'ram'
  },
    animations: [trigger('listAnimation', [
  transition('* => *', [
    query(':enter', [
      style({ opacity: 0 }),
      stagger(100, [
        animate('0.5s ease-in', style({ opacity: 1 }))
      ])
    ],{optional: true})
  ])
])]
})
export class DetailsComponent implements OnInit {
  pokemon: {[key: string]: any}
  errorObj
  loading=true;
  showAnim=false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpService
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(filter(e=> e.id), distinctUntilKeyChanged('id')).subscribe(e=>{
      this.fetchData(e.id)
    })
  }

   async fetchData(id,url?){
     this.showAnim=true;
    if(!url){
      url=environment.serviceUrl + 'pokemon/'+ id
    }
    url= new URL(url).origin + new URL(url).pathname
    try {
      this.loading=true;
        this.pokemon= await this.http.get({ url }) as {results:any[], previous: string | null, next: string | null, count: number};
    } catch (error) {
      this.pokemon=null
      this.errorObj=error
    }finally{
      this.loading=false;
      this.showAnim=false;
    }
  }

}
