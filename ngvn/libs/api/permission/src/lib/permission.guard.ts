import { CanActivate, ExecutionContext, mixin } from '@nestjs/common';
import { Constructor } from '@nestjs/common/utils/merge-with-values.util';
import { GqlExecutionContext } from '@nestjs/graphql';
import { memoize } from '@ngvn/api/common';
import { PermissionNames, Privilege } from '@ngvn/shared/permission';
import { getAuthUser } from './utils/get-auth-user.util';
import { hasPrivilege } from './utils/has-privilege.util';

export const PermissionGuard: (
  name: PermissionNames,
  privilege: Privilege,
  checkSystemType?: boolean,
) => CanActivate = memoize(createPermissionGuard);

function createPermissionGuard(
  name: PermissionNames,
  privilege: Privilege,
  checkSystemType: boolean = true,
): Constructor<CanActivate> {
  class MixinPermissionGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
      const currentUser = getAuthUser(context);
      const hasPermission = () => {
        if (currentUser.permissions == null || !currentUser.permissions.length) {
          return false;
        }

        return currentUser.permissions.some(hasPrivilege(name, privilege, checkSystemType));
      };

      return currentUser && (currentUser.isSystemAdmin || hasPermission());
    }
  }

  return mixin(MixinPermissionGuard);
}
