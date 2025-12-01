import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';

import configuration from './config/configuration';
import { PrismaModule } from './prisma/prisma.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

// Feature modules (to be implemented)
// import { AuthModule } from './modules/auth/auth.module';
// import { UsersModule } from './modules/users/users.module';
// import { DependentsModule } from './modules/dependents/dependents.module';
// import { DocumentsModule } from './modules/documents/documents.module';
// import { ProcessesModule } from './modules/processes/processes.module';
// import { TasksModule } from './modules/tasks/tasks.module';
// import { ChatModule } from './modules/chat/chat.module';
// import { BillingModule } from './modules/billing/billing.module';
// import { NotificationsModule } from './modules/notifications/notifications.module';
// import { AdminModule } from './modules/admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    PrismaModule,
    // Feature modules (uncomment as implemented)
    // AuthModule,
    // UsersModule,
    // DependentsModule,
    // DocumentsModule,
    // ProcessesModule,
    // TasksModule,
    // ChatModule,
    // BillingModule,
    // NotificationsModule,
    // AdminModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
