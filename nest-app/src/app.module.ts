import { Module } from '@nestjs/common';
import { FlaskModule } from '../../server/src/modules/flask/flask.module';

@Module({
  imports: [FlaskModule],
  // ...existing code...
})
export class AppModule {}
