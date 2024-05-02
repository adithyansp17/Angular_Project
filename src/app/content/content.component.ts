import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss'
})
export class ContentComponent implements OnInit{
  constructor(){
    //console.log("Constructor called")
  }
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }
  
}

// @Component({
//   selector: 'app-second-component',
//   template: '<div>hello second</div>',
//   styleUrl: './content.component.scss'
// })

// export class SecondComponent {
//   constructor(){
//     console.log("I'm the second component")
//   }
// }
