import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../services/loading.service';


@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
})
export class LoaderComponent implements OnInit {
  loader: boolean = false;

  constructor(private loaderService: LoadingService) {}

  ngOnInit() {
    this.loaderService.getLoaderObserver().subscribe((status) => {
      this.loader = status === 'start';
    });
  }
}
