import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { DEFAULT_ERROR_TEXT } from '~/constants';
import { finalize } from 'rxjs/internal/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'Upload',
  moduleId: module.id,
  templateUrl: './upload-photo.component.html',
  styleUrls: ['./upload-photo.component.css']
})
export class UploadPhotoComponent implements OnInit {

  error: string = null;
  isLoading: boolean = false;
  orderNumber: number;

  constructor(
    private router: RouterExtensions,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.orderNumber = Number(this.route.snapshot.paramMap.get('id'));
  }

  upload(): void {
  }

          // this.error = (error.error && error.error.message) || JSON.stringify(error.error || error) || DEFAULT_ERROR_TEXT;
}
