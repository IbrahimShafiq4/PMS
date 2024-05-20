import { Component, ElementRef, EventEmitter, HostListener, Output, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth/auth.service';

// Define interface for menu items
interface IMenu {
  text: string;
  icon: string;
  link: string;
  isActive: boolean;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
    // Event emitter to notify parent component about sidebar collapse state
    @Output() sidebarCollapsed: EventEmitter<boolean> = new EventEmitter();
    // Getting the Aside Tag From Html
    @ViewChild('aside') asideElement!: ElementRef;

    // Variable to track sidebar collapse state
    collapsed: boolean = false;
    asideWidth: number = 0;
    textLinkVisibility: boolean = false;
    arrowVisibility: boolean = false;

    constructor(private _AuthService: AuthService) {}

    ngOnInit() {}

    // HostListener to detect window resize and adjust sidebar accordingly
    @HostListener('window:resize', ['$event'])
    onResize(event: Event) {
      this.asideWidth = this.asideElement.nativeElement.offsetWidth;
      // Check if the sidebar width is less than or equal to 182 pixels
      // If true, show only icons and hide text
      if (this.asideWidth <= 182) {
        this.textLinkVisibility = true;
      } else {
        this.textLinkVisibility = false;
      }

      if (window.innerWidth <= 991) {
        this.arrowVisibility = true;
      } else {
        this.arrowVisibility = false;
      }
    }

    // Check if user is admin
    isManager(): boolean {
      return this._AuthService.role == 'Manager' ? true : false;
    }

    // Check if user is regular user
    isEmployee(): boolean {
      return this._AuthService.role == 'Employee' ? true : false;
    }

    // Sidebar menu items
    menu: IMenu[] = [
      {
        text: 'Home',
        link: '/dashboard/home',
        icon: 'fa-solid fa-house',
        isActive: this.isManager() || this.isEmployee(),
      },
      {
        text: 'Users',
        link: '/dashboard/manager/users',
        icon: 'fa-solid fa-users',
        isActive: this.isManager(),
      },
      {
        text: 'Projects',
        link: '/dashboard/employee/projects',
        icon: 'fa-solid fa-bars-progress',
        isActive: this.isEmployee(),
      },
      {
        text: 'Tasks',
        link: '/dashboard/employee/task-board',
        icon: 'fa-solid fa-heart',
        isActive: this.isEmployee(),
      },
      {
        text: 'Projects',
        link: '/dashboard/manager/projects',
        icon: 'fa-solid fa-list-check',
        isActive: this.isManager(),
      },
      {
        text: 'Tasks',
        link: '/dashboard/manager/tasks',
        icon: 'fa-solid fa-layer-group',
        isActive: this.isManager(),
      },
    ];

    // Method to toggle sidebar collapse
    collapsing(): void {
      this.collapsed = !this.collapsed;
      this.sidebarCollapsed.emit(this.collapsed);
    }
}
