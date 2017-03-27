import { Component, OnInit } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { AlertService } from '../../core/services/alert.service';
import { DestroySubscribers } from "ng2-destroy-subscribers";


@DestroySubscribers({
  addSubscribersFunc: 'addSubscribers',
  removeSubscribersFunc: 'removeSubscribers',
  initFunc: 'ngOnInit',
  destroyFunc: 'ngOnDestroy',
})
@Component({
  selector: 'alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  message: any;
  constructor(private alertService: AlertService,
              public snackBar: MdSnackBar) {}
  ngOnInit() {}
  addSubscribers() {
    this.alertService.getMessage()
      .subscribe(
        (message) => {
          if ( message !== undefined ) {
           if ( message.type == 'error') {
             this.snackBar.open( message.text, message.type, {duration:4000 });
           } else {
             this.snackBar.open( message.text, message.type, {duration:1000 });
           }
          }
        }
      );
  }
}


