import { Controller, Route, Tags, Post, Body, SuccessResponse, Response, Example } from 'tsoa';
import type {
  RegisterInput,
  LoginInput,
  AuthResponse,
  DefaultErrorResponse,
  SuccessDefaultResponse,
} from '../docs/schemas';

@Route('/auth')
@Tags('Authentication')
export class AuthTsoaController extends Controller {
  /**
   * Registra um novo usuário
   * @summary Registrar usuário
   */
  @SuccessResponse('201', 'Created')
  @Example<RegisterInput>({
    name: 'John Doe',
    email: 'john@example.com',
    password: 'StrongPassword123!',
  })
  @Response<DefaultErrorResponse>('400', 'Bad Request: Validation error', {
    success: false,
    code: 'ValidationError',
    errors: {
      description: 'Expected string, received number',
    },
  })
  @Response<DefaultErrorResponse>('409', 'Conflict: User already exists', {
    success: false,
    error: 'User already exists',
    code: 'ConflictError',
  })
  @Post('/register')
  public async register(
    @Body() body: RegisterInput,
  ): Promise<SuccessDefaultResponse<AuthResponse>> {
    return {
      success: true,
      data: {
        user: {
          id: '550e8400-e29b-41d4-a716-446655440000',
          name: body.name,
          email: body.email,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      },
    };
  }

  /**
   * Autentica um usuário existente
   * @summary Login do usuário
   */
  @SuccessResponse('200', 'OK')
  @Example<LoginInput>({
    email: 'john@example.com',
    password: 'StrongPassword123!',
  })
  @Response<DefaultErrorResponse>('400', 'Bad Request: Validation error', {
    success: false,
    code: 'ValidationError',
    errors: {
      description: 'Expected string, received number',
    },
  })
  @Response<DefaultErrorResponse>('401', 'Unauthorized: Invalid credentials', {
    success: false,
    error: 'Invalid credentials',
    code: 'UnauthorizedError',
  })
  @Post('/login')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async login(@Body() body: LoginInput): Promise<SuccessDefaultResponse<AuthResponse>> {
    return {
      success: true,
      data: {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      },
    };
  }
}
