import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  private readonly users = [
    { userId: 1, username: 'user1', password: 'password1' },
    { userId: 2, username: 'user2', password: 'password2' },
  ];

  findByUsername(username: string): any {
    return this.users.find(user => user.username === username);
  }
}
