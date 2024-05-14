import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-shared-header',
  templateUrl: './shared-header.component.html', // Template file path
  styleUrls: ['./shared-header.component.scss'], // Styles file path
})
export class SharedHeaderComponent {
  // Input properties, marked with @Input() decorator, to receive data from parent component
  @Input() headerLinkText: string = ''; // Text for the link in the header
  @Input() headerLink: string = ''; // Router link for the header link
  @Input() headerText: string = ''; // Text for the main header
  @Input() headerMainText: string = ''; // Additional main text for the header
  @Input() headerBtnText: string = ''; // Text for the button in the header
  @Input() headerBtnVisibility: boolean = true; // Visibility of the button
  @Input() headerBtnLink: string = ''; // Router link for the button
}
