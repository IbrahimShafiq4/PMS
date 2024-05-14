import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-shared-header',
  templateUrl: './shared-header.component.html',
  styleUrls: ['./shared-header.component.scss'],
})
export class SharedHeaderComponent {
  @Input() headerLinkText: string = '';
  @Input() headerLink: string = '';
  @Input() headerText: string = '';
  @Input() headerMainText: string = '';
  @Input() headerBtnText: string = '';
  @Input() headerBtnVisibility: boolean = true;
  @Input() headerBtnLink: string = '';
}
