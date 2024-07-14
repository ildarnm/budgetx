import { Component, input, OnInit } from '@angular/core';
import { RecordModel } from "@shared/models/Record";

@Component({
  selector: 'x-record',
  standalone: true,
  template: `
    <input placeholder="Name" type="text">
    <input placeholder="Value" type="text">`
})

export class RecordComponent implements OnInit {
  record = input.required<RecordModel>()

  constructor() {
  }

  ngOnInit() {
  }
}
