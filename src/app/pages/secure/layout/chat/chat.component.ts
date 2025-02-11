import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Message } from '../../../../classes/message';
import { MessageService } from '../../../../services/message.service';
import { SocketService } from '../../../../services/socket.service';
import { currentUser } from '../../../../signals/user';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent implements OnInit {
  form: FormGroup;
  messages: Message[] = [];

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private socketService: SocketService,
    private route: ActivatedRoute
  ) {
    this.form = fb.group({
      content: '',
    });
  }
  ngOnInit(): void {
    this.socketService.getMessages().subscribe((message: any) => {
      this.messages.push(message);
    });

    this.messageService.all(this.route.snapshot.params['id']).subscribe({
      next: (response: any) => {
        this.messages = response.messages;
      },
      error: (err) => {},
    });
  }

  submit() {
    const formData = this.form.getRawValue();
    formData['receiver_id'] = this.route.snapshot.params['id'];
    formData['type'] = 'text';
    this.messageService.create(formData).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  protected readonly currentUser = currentUser;
}
