import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { DoctorForm } from './components/doctor-form/doctor-form';
import { DiseaseForm } from './components/disease-form/disease-form';
import { PatientForm } from './components/patient-form/patient-form';
import { Appointment } from './components/appointment/appointment';
import { Payment } from './components/payment/payment';
import { DoctorReviews } from './components/doctor-reviews/doctor-reviews';
import { Summary } from './components/summary/summary';

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
    },
    { 
        path: 'doctor/:doctorId/reviews', 
        component: DoctorReviews,
        title: "Doctor Reviews"
    },
    {
        path: "disease",
        component: DiseaseForm,
        title: "Disease Form"
    },
    {
        path: "patient",
        component: PatientForm,
        title: "Patient Intake Form"
    },
    {
        path: "appointment",
        component: Appointment,
        title: "Schedule an Appointment"
    },
    {
        path: "payment",
        component: Payment,
        title: "Make a Payment"
    },
    {
        path: "summary",
        component: Summary,
        title: "Summary"
    }
];
