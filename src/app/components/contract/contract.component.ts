import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'dialog-content',
  templateUrl: './contract.component.html',
})
export class PolicyDiaglog  {
  constructor(public dialog: MatDialog) {}
}
