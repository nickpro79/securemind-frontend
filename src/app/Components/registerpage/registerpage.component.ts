import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ValidatorFn,AbstractControl} from '@angular/forms';
import { Register } from '../../Models/register';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-registerpage',
  templateUrl: './registerpage.component.html',
  styleUrl: './registerpage.component.css'
})
export class RegisterpageComponent implements OnInit {

  data:Register={ username:"", email:"", password:""}

  registerForm:FormGroup=null!  

  constructor(private _userservice:UserService,private fb:FormBuilder){}

  ngOnInit(): void {
    this.registerForm=this.fb.group({
      username:['',Validators.required],
      email:['', [Validators.required,Validators.email]],
      password:['',[Validators.required,this.passwordValidator]],
      confirmpassword:['',[]]
    },{
      validators:[this.passwordValidator,this.passwordMatchValidator()]
    })
  }


   passwordValidator(control: any) {
    const password = control.value;
    if (!password) return null;
  
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isLengthValid = password.length >= 8;
  
    if (!hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar || !isLengthValid) {
      return { passwordComplexity: true };
    }
    
    return null;
  }

  validateControl(input:string){
  return this.registerForm.get(input)?.invalid &&
  (this.registerForm.get(input)?.touched || this.registerForm.get(input)?.dirty)
  }

validateControlError(input:string,errorType:string){
    return this.registerForm.get(input)?.hasError(errorType) &&
    (this.registerForm.get(input)?.touched || this.registerForm.get(input)?.dirty)
  }

  passwordMatchValidator(): ValidatorFn {
    return (formGroup: AbstractControl): { [key: string]: boolean } | null => {
      const password = formGroup.get('password')?.value;
      const confirmPassword = formGroup.get('confirmpassword')?.value;
      
      if (password !== confirmPassword) {
        formGroup.get('confirmpassword')?.setErrors({ passwordMismatch: true });
        return { passwordMismatch: true };
      } else {
        return null;
      }
    };
}

get isFormValid() {
  return this.registerForm.valid;
}

RegisterButton(username:string,email:string,password:string,confirmedpassword:string)
{
  if(password!==confirmedpassword){
    alert("Passwords do not match")
  }
  this.data.username = username,
  this.data.email = email,
  this.data.password=password

 this._userservice.Register(this.data)
 .subscribe({
  next:(response)=>{console.log(response)},
  error:(error)=>{console.log(error)}
 })


}



// Use this function to give separate error message for each validation
// passwordValidator(control: any) {
//   const password = control.value;
//   if (!password) return null;

//   const errors: any = {};

//   if (password.length < 8) {
//     errors['minLength'] = true;
//   }

//   if (!/[A-Z]/.test(password)) {
//     errors['uppercase'] = true;
//   }
//   if (!/[a-z]/.test(password)) {
//     errors['lowercase'] = true;
//   }
//   if (!/\d/.test(password)) {
//     errors['number'] = true;
//   }
//   if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
//     errors['specialChar'] = true;
//   }

//   return Object.keys(errors).length ? errors : null;
// }

}


