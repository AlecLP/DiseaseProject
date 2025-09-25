import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { DoctorForm } from './components/doctor-form/doctor-form';

export const routes: Routes = [
    {
        path: "login",
        component: Login,
        title: "Login"
    },
    {
        path: "register",
        component: Register,
        title: "Register"
    },
    {
        path: "doctor",
        component: DoctorForm,
        title: "Doctor Form"
    }
];
