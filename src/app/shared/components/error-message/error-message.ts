import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-message',
  imports: [CommonModule],
  templateUrl: './error-message.html',
  styleUrl: './error-message.scss',
})
export class ErrorMessage {
@Input() message = '';
}
