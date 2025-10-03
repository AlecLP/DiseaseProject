import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-payment',
  imports: [RouterLink, CommonModule],
  templateUrl: './payment.html',
  styleUrl: './payment.css'
})
export class Payment {
  readonly paymentOptions = ['Visa', 'MasterCard', 'PayPal', 'Stripe']

}
