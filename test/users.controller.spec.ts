import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from '../src/user/dto/create-user.dto';
import { UpdateUserDto } from '../src/user/dto/update-user.dto';
import { User } from '../src/user/entities/user.entity';
import { UserController } from '../src/user/user.controller';
import { UserService } from '../src/user/user.service';


describe('UsersController', () => {
  let controller: UserController;

  const mockUsersService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('create => should create a new user by a given data', async () => {
    // arrange
    const createUserDto = {
      name: '', 
      address: '', 
    } as CreateUserDto;

    const user = {
      name: '', 
      address: '', 
    } as User;

    jest.spyOn(mockUsersService, 'create').mockReturnValue(user);

    // act
    const result = await controller.create(createUserDto);

    // assert
    expect(mockUsersService.create).toBeCalled();
    expect(mockUsersService.create).toBeCalledWith(createUserDto);

    expect(result).toEqual(user);
  });

  it('findAll => should return an array of user', async () => {
    //arrange
    const user = {
      id: Date.now(),
      firstname: 'Chadwick',
      lastname: 'Boseman',
      email: 'chadwickboseman@email.com',
    };
    const users = [user];
    jest.spyOn(mockUsersService, 'findAll').mockReturnValue(users);

    //act
    const result = await controller.findAll();

    // assert
    expect(result).toEqual(users);
    expect(mockUsersService.findAll).toBeCalled();
  });

  it('findOne => should find a user by a given id and return its data', async () => {
    //arrange
    const id = '1';
    const user = {
      id: 1,
      firstname: 'Chadwick',
      lastname: 'Boseman',
      email: 'chadwickboseman@email.com',
    };

    jest.spyOn(mockUsersService, 'findOne').mockReturnValue(user);

    //act
    const result = await controller.findOne(id);

    expect(result).toEqual(user);
    expect(mockUsersService.findOne).toBeCalled();
    expect(mockUsersService.findOne).toBeCalledWith(+id);
  });

  it('update => should find a user by a given id and update its data', async () => {
    //arrange
    const id = '1';
    const updateUserDto = {
      firstname: 'Chadwick',
      lastname: 'Boseman',
      email: 'chadwickboseman@email.com',
    } as UpdateUserDto;
    const user = {
      id: 1,
      firstname: 'Chadwick',
      lastname: 'Boseman',
      email: 'chadwickboseman@email.com',
    };

    jest.spyOn(mockUsersService, 'update').mockReturnValue(user);

    //act
    const result = await controller.update(id, updateUserDto);

    expect(result).toEqual(user);
    expect(mockUsersService.update).toBeCalled();
    expect(mockUsersService.update).toBeCalledWith(+id, updateUserDto);
  });
  
  it('remove => should find a user by a given id, remove and then return Number of affected rows', async () => {
    const id = '1';
    const user = {
      id: 1,
      firstname: 'Chadwick',
      lastname: 'Boseman',
      email: 'chadwickboseman@email.com',
    };

    jest.spyOn(mockUsersService, 'remove').mockReturnValue(user);

    //act
    const result = await controller.remove(id);

    expect(result).toEqual(user);
    expect(mockUsersService.remove).toBeCalled();
    expect(mockUsersService.remove).toBeCalledWith(+id);
  });
});
