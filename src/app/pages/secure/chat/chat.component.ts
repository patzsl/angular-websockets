import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from '../../../services/message.service';
import { SocketService } from '../../../services/socket.service';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent implements OnInit {
  form: FormGroup;
  messages: string[] = [];

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private socketService: SocketService
  ) {
    this.form = fb.group({
      message: '',
    });
  }
  ngOnInit(): void {
    this.socketService.getMessages().subscribe((message: any) => {
      this.messages.push(message);
    });
  }

  submit() {
    this.messageService.create(this.form.getRawValue()).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
