import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Item } from './item';
import { ItemService } from './item.service';
import * as imagepicker from '@nativescript/imagepicker';
import { ImageSource } from '@nativescript/core';
import { UploadService } from '../services/upload/upload.service';


@Component({
    selector: "ns-details",
    templateUrl: "./item-detail.component.html",
})
export class ItemDetailComponent implements OnInit {
    item: Item;

    constructor(
        private itemService: ItemService,
        private route: ActivatedRoute,
        private uploadService: UploadService
    ) {}

    ngOnInit(): void {
        const id = +this.route.snapshot.params.id;
        this.item = this.itemService.getItem(id);
    }

    async test2() {
        let context = imagepicker.create({ mode: 'single' });
        await context.authorize();
        const selection = await context.present();
        const imageSource = await ImageSource.fromAsset(selection[0]);
        const response = await this.uploadService.upload(`https://3b7c55409d4d.ngrok.io/api/v1/admin/orders/10001/media`, imageSource);

        console.log('resp');
        console.log(Object.keys(response.data || response));
    }
}
