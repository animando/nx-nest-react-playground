import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Http2ServerRequest } from 'http2';
import { verifyToken } from '@clerk/backend';
import { RolesMeta, Type, TypeMeta } from './clerk-auth.constants';
import { Reflector } from '@nestjs/core';
import { ClerkConfigService } from './clerk-config.service';
import { validateToken } from './clerk-auth.lib';

type GraphqlContext = {
  req: Http2ServerRequest;
};

const getHttpRequestFromContext = (context: ExecutionContext, type: Type) => {
  switch (type) {
    case 'http':
      return context.switchToHttp().getRequest<Http2ServerRequest>();
    case 'graphql':
      return GqlExecutionContext.create(context).getContext<GraphqlContext>()
        .req;
    default:
      throw Error('unknown type');
  }
};

const getToken = (
  context: ExecutionContext,
  type: Type
): string | undefined => {
  const request = getHttpRequestFromContext(context, type);
  const authz = request?.headers['authorization'];
  const token = authz?.split(' ')[1];

  return token;
};

@Injectable()
export class VerifyTokenGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject() private clerkConfig: ClerkConfigService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>(RolesMeta, context.getHandler());
    const type = this.reflector.get<Type>(TypeMeta, context.getHandler());

    const token = getToken(context, type);
    return validateToken(token);
  }
}
