import { Component, OnInit } from '@angular/core';
import { DestroySubscribers } from "ng2-destroy-subscribers";

@Component({
    selector: 'app-profile',
    templateUrl: 'profile.component.html',
    styleUrls: ['profile.component.css'],
})
@DestroySubscribers({
    addSubscribersFunc: 'addSubscribers',
    removeSubscribersFunc: 'removeSubscribers',
    initFunc: 'ngOnInit',
    destroyFunc: 'ngOnDestroy',
})

export class ProfileComponent implements OnInit {
    constructor() {}
    ngOnInit() {}
    addSubscribers() {}
}