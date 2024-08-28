import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { RouterModule } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent as NavbarComponent } from "./components/navbar/navbar.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  logout() {
    console.log('Logout function will be implemented here.');
  }
  title = 'textile-designer-frontend';
  currentRoute: string = '';
  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects;
        this.updateTitle();
      }
    });
  }

  updateTitle() {
    switch (this.currentRoute) {
      case '/login':
        this.title = 'Login - Textile Designer';
        break;
      case '/register':
        this.title = 'Register - Textile Designer';
        break;
      case '/dashboard':
        this.title = 'Dashboard - Textile Designer';
        break;
      default:
        this.title = 'Textile Designer';
    }
  }
}
