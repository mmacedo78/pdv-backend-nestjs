import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateUserDto } from '../src/user/dto/create-user.dto';
import { User } from '../src/user/entities/user.entity';
import { UserService } from '../src/user/user.service';


describe('UserService', () => {
  let service: UserService;

  const mockUserRepository = {
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create => Should create a new user and return its data', async () => {
    // arrange
    const createUserDto = {
      name: '', 
      address: '', 
    } as CreateUserDto;

    const user = {
      name: '', 
      address: '', 
    } as User;

    jest.spyOn(mockUserRepository, 'save').mockReturnValue(user);

    // act
    const result = await service.create(createUserDto);

    // assert
    expect(mockUserRepository.save).toBeCalled();
    expect(mockUserRepository.save).toBeCalledWith(createUserDto);

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
    jest.spyOn(mockUserRepository, 'find').mockReturnValue(users);

    //act
    const result = await service.findAll();

    // assert
    expect(result).toEqual(users);
    expect(mockUserRepository.find).toBeCalled();
  });

  it('findOne => should find a user by a given id and return its data', async () => {
    //arrange
    const id = 1;
    const user = {
      id: 1,
      firstname: 'Chadwick',
      lastname: 'Boseman',
      email: 'chadwickboseman@email.com',
    };

    jest.spyOn(mockUserRepository, 'findOne').mockReturnValue(user);

    //act
    const result = await service.findOne(id);

    expect(result).toEqual(user);
    expect(mockUserRepository.findOne).toBeCalled();
    expect(mockUserRepository.findOne).toBeCalledWith({ where: { id } });
  });

  it('remove => should find a user by a given id, remove and then return Number of affected rows', async () => {
    const id = 1;
    const user = {
      id: 1,
      firstname: 'Chadwick',
      lastname: 'Boseman',
      email: 'chadwickboseman@email.com',
    };

    jest.spyOn(mockUserRepository, 'delete').mockReturnValue(user);

    //act
    const result = await service.remove(id);

    expect(result).toEqual(user);
    expect(mockUserRepository.delete).toBeCalled();
    expect(mockUserRepository.delete).toBeCalledWith(id);
  });
});
