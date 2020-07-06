import { Module } from '@nestjs/common';
import { ApiPermissionModule } from '@ngvn/api/permission';
import { ApiProjectModule } from '@ngvn/api/project';
import { ApiSecurityModule } from '@ngvn/api/security';
import { ApiTeamModule } from '@ngvn/api/team';
import { ApiUserModule } from '@ngvn/api/user';

export const apiModules = [ApiUserModule, ApiPermissionModule, ApiTeamModule, ApiSecurityModule, ApiProjectModule];

@Module({
  imports: [...apiModules],
})
export class ApiModule {}
