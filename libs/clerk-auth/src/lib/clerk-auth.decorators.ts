import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { RolesMeta, TypeMeta } from './clerk-auth.constants';
import { VerifyTokenGuard } from './clerk-auth-guard';

export function ClerkAuth(...roles: string[]) {
  return applyDecorators(
    SetMetadata(TypeMeta, 'http'),
    SetMetadata(RolesMeta, roles),
    UseGuards(VerifyTokenGuard)
  );
}
export function ClerkAuthGraphql(...roles: string[]) {
  return applyDecorators(
    SetMetadata(TypeMeta, 'graphql'),
    SetMetadata(RolesMeta, roles),
    UseGuards(VerifyTokenGuard)
  );
}
