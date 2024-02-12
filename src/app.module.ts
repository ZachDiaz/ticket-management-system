import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AuthModule,
    JwtModule.register({
      secret: 'secret_key',
      signOptions: { expiresIn: '60s' }, 
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
