import { Component, OnInit } from '@angular/core';
import { ToastService } from '../services/toast.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'Photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {

  photoUrl: string;

  constructor(
    private toastService: ToastService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.photoUrl = this.route.snapshot.queryParamMap.get('photoUrl');
    if (!this.photoUrl) {
      this.toastService.showError(`Нет фото для отображения`);
    }
  }
}
