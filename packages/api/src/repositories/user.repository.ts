import { EntityRepository, Repository } from "typeorm"
import { User } from '../users/user.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from '../users/dto/user-login.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    signUp(createUserDto: CreateUserDto): Promise<any> {
        const user = new User();
        user.login = createUserDto.login;
        user.password = createUserDto.password;

        return this.save(user).then((user: User) => {
 
            return user;
        }) 
    }

    signIn(loginUserDto: LoginUserDto): Promise<any> {
        console.log("loginUserDto:", loginUserDto)
        const login = loginUserDto.login;
        const password = loginUserDto.password;
        const result = this.findOne({ login:  login}).then((user: User) => {
            if (user && user.password === password) {
                const { password, ...result } = user;
    
                return result;
              }
    
            return null;
        });

        
        return result;
    }
      

    findOneUserById(id: number, ): Promise<any> {
        return this.findOne({ id }).then((user: User): any =>{

            return user
        });
    }

    findOneUserByLogin(login: string ): Promise<any> {
        return this.findOne({ login }).then((user: User): any =>{

            return user
        });
    }
}