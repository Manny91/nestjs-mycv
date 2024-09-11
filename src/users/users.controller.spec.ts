import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptors';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { User } from './entities/user.entity';
import { NotFoundException } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUsersService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    const logUserFuncs = {
      logInsert: () => {},
      logRemove: () => {},
      logUpdate: () => {},
    };
    fakeUsersService = {
      findOne: (id: string) =>
        Promise.resolve({
          id,
          email: 'testEmail',
          password: 'testpassword',
          ...logUserFuncs,
        } as User),
      find: (email: string) => {
        return Promise.resolve([
          {
            id: '1',
            email,
            password: 'testpassword',
            ...logUserFuncs,
          } as User,
        ]);
      },
      //   remove: (id: string) => {},
      //   udpate: () => {},
    };
    fakeAuthService = {
      //   signup: () => {},
      signin: (email: string, password: string) => {
        return Promise.resolve({
          id: '1',
          email,
          password,
          ...logUserFuncs,
        } as User);
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: UsersService, useValue: fakeUsersService },
        { provide: AuthService, useValue: fakeAuthService },
        { provide: APP_INTERCEPTOR, useClass: CurrentUserInterceptor },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findUsers returns a single user with the given ide', async () => {
    const user = await controller.findUser('1');
    expect(user).toBeDefined();
  });

  it('findAllUsers returns a list of users with the given email', async () => {
    const users = await controller.findAllUsers('testEmail');
    expect(users.length).toEqual(1);
    expect(users[0].email).toEqual('testEmail');
  });

  it('findUser throws an error if user with given id is not found', async () => {
    fakeUsersService.findOne = () => null;
    await expect(controller.findUser('1')).rejects.toThrow(NotFoundException);
  });

  it('signin updates session object and returns user', async () => {
    const session = { userId: -1 };
    const user = await controller.signin(
      { email: 'asdf@asdf.com', password: 'asdf' },
      session,
    );
    expect(user).toBeDefined();
    expect(user.id).toBe('1');
    expect(session.userId).toEqual('1');
  });
});
