import {Component, OnInit} from '@angular/core';
import {MdSnackBar} from '@angular/material';
import {AlertService} from '../../core/services/alert.service';

@Component({
    selector: 'alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.css']
})

export class AlertComponent implements OnInit {

    message: any;
    private subscribers:any = {};

    constructor( private alertService: AlertService,
                 private snackBar: MdSnackBar) {
    }

    ngOnInit() {
        this.subscribers.messageSubscription = this.alertService.getMessage()
            .subscribe(
                (message) => {
                    if (message !== undefined) {
                        if (message.type == 'error') {
                            this.snackBar.open(message.text, message.type, {duration: 4000});
                        } else {
                            this.snackBar.open(message.text, message.type, {duration: 1000});
                        }
                    }
                }
            );
    }

    ngOnDestroy() {
        for (let property in this.subscribers) {
            if ( (typeof this.subscribers[property] !== 'undefined') && (this.subscribers[property] !== null) ) {
                this.subscribers[property].unsubscribe();
            }
        }
    }
}


