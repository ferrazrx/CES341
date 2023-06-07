import { Container } from 'inversify';
import { TYPES } from './app.types';
import { Repository } from './repositories/repository.interface';
import { User } from './models/User';
import { UsersRepository } from './repositories/users.repository';
import { PhonesService } from './services/phones.service';

import { Phone } from './models/Phone';
import { PhonesRepository } from './repositories/phones.repository';
import { UsersService } from './services/users.service';
import { AuthService } from './services/auth.service';

const myContainer = new Container();
myContainer.bind<Repository<Phone>>(TYPES.phoneRepository).to(PhonesRepository);
myContainer.bind<PhonesService>(TYPES.phoneService).to(PhonesService);

myContainer.bind<Repository<User>>(TYPES.userRepository).to(UsersRepository);
myContainer.bind<AuthService>(TYPES.authService).to(AuthService);
myContainer.bind<UsersService>(TYPES.userService).to(UsersService);

export { myContainer };
