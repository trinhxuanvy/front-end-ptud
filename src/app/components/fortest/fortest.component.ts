import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../../services/invoice.service';

@Component({
  selector: 'app-fortest',
  templateUrl: './fortest.component.html',
  styleUrls: ['./fortest.component.scss'],
})
export class FortestComponent implements OnInit {
  constructor(private invoice: InvoiceService) {}

  ngOnInit(): void {}
}
