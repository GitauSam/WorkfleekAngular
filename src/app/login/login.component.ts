import { Component, OnInit, Input } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { User } from "../models/UserModal";
import { AuthenticationService } from "../service/authentication.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {

  user = new User();
  isLoggedIn = false
  
  // Input() 
  errorMessage: string | null;

  constructor(private router: Router, private authManager: AuthenticationService) {}

  ngOnInit() {
  }

  onSubmit() {
    console.log('log in has been invoked');
    console.log('username: ' + this.user.username);
    console.log('password: ' + this.user.password);


    this.authManager.authenticate(this.user.username, this.user.password).subscribe(
      data => {
        this.router.navigate(['/create-webuser'])
        this.isLoggedIn = true
      },
      error => {
        console.log('received callback error');
        console.log(error.message);
        this.isLoggedIn = false
        this.errorMessage = "error.message";

      }
    )
    
  }
}
