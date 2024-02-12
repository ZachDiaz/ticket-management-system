import { NestFactory } from '@nestjs/core';
import { TicketModule } from './ticket/ticket.module';
import { AuthModule } from './auth/auth.module'; // Import AuthModule
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const authApp = await NestFactory.create(AuthModule);
  app.use('/auth', authApp);

  const ticketApp = await NestFactory.create(TicketModule);
  app.use('/tickets', ticketApp);

  await app.listen(3000);
}
bootstrap();
