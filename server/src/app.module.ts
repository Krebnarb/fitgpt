import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WorkoutSetInstanceModule } from './modules/workout-set-instance/workout-set-instance.module';
import { SpeechModule } from './modules/speech/speech.module';
// ...existing code...

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,  // Make config available globally
      envFilePath: '.env', // Explicitly load the .env file in the root directory
    }),
    WorkoutSetInstanceModule,
    SpeechModule
  ],
  // ...existing code...
})
export class AppModule {}
