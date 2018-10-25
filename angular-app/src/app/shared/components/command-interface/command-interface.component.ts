import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-command-interface',
  templateUrl: './command-interface.component.html',
  styleUrls: ['./command-interface.component.scss']
})
export class CommandInterfaceComponent implements OnInit {

  public input: string;

  constructor() { }

  ngOnInit() {
  }

}
