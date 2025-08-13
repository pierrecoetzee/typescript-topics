export {};

interface IUser {
  id: number;
  name: string;
  email: string;
  age?: number;
  password: string;
  createdAt: Date;
}

interface IPublicUser extends IUser {
  role: 'admin' | 'user';
}

const determineUser = (user: IUser): IPublicUser => {
  return {
    ...user,
    role: user.age && user.age > 18 ? 'admin' : 'user'
  };
};

console.log(determineUser({id: 1, name: 'John', email: 'john@example.com', password: 'password123', createdAt: new Date()}))
console.log(determineUser({id: 1, name: 'John', email: 'john@example.com', password: 'password123', createdAt: new Date(), age: 20}))

//===================

interface IUserResponse {
  success: boolean;
  data: IUser;
}

interface IErrorResponse {
  success: boolean;
  error: string;
}

const fetchUser = async (id: number, error: boolean = false): Promise<IUserResponse | IErrorResponse> => {
  try {
    // Simulating API call
    if (error) {
      throw new Error('User not found');
    }
    const user: IUser = {
      id,
      name: 'John Doe',
      email: 'john@example.com',
      password: 'hashedPassword',
      createdAt: new Date(),
      age: 25
    };

    return {
      success: true,
      data: user
    };
  } catch (error: unknown) {
    const { message } = error as Error;
    return {
      success: false,
      error: `Failed to fetch user: ${message}`
    };
  }
};

// Wrap async operations in an async function
const main = async () => {
  const user = await fetchUser(1);
  if ('data' in user) {
    console.log(user as IUserResponse);
  }

  const errorUser = await fetchUser(1, true);
  if ('error' in errorUser) {
    console.log(errorUser as IErrorResponse);
  }
};

// Call the main function
main().catch(console.error);


// =======Example 2=======
type adminRole = 'admin' | 'user';

interface IGenericUser extends IUser {
  permissions?: string[];
  role?: adminRole;
}

type Getters<T> = {
  [P in keyof T as `get${Capitalize<string & P>}`]: () => T[P];
}

type UserGetters = Getters<IUser>;
type AdminUserGetters = Getters<IGenericUser>;

// Example implementation of a class using Getters
class UserWithGetters implements AdminUserGetters, UserGetters {
  private user: IUser;

  constructor(user: IUser) {
    this.user = user;
  }

  getRole(): adminRole | undefined  {
    return ('role' in this.user) ? this.user.role as adminRole : 'user';
  }

  getPermissions(): string[] {
    return ('role' in this.user) ? ['view', 'edit', 'delete'] : []
  }

  getId(): number {
    return this.user.id;
  }

  getName(): string {
    return this.user.name;
  }

  getEmail(): string {
    return this.user.email;
  }

  getAge(): number | undefined {
    return this.user.age;
  }

  getPassword(): string {
    return this.user.password;
  }

  getCreatedAt(): Date {
    return this.user.createdAt;
  }
}

// Usage example
const users: IGenericUser[] = [{
  id: 1,
  name: 'John',
  email: 'john@example.com',
  password: 'password123',
  createdAt: new Date(),
  age: 25,
  role: 'admin',
  permissions: ['view', 'edit', 'delete']
},
  {
    id: 2,
    name: 'Jack',
    email: 'jack@example.com',
    password: 'newpass123',
    createdAt: new Date(),
    age: 71,
    role: 'user',
  }];


users.forEach(user => {
  const userInstance = new UserWithGetters(user);
  Object.keys(user).forEach(key => {
    console.log(`key:${key}:`,
      userInstance[`get${key.charAt(0).toUpperCase()}${key.slice(1)}` as string as keyof UserGetters]());
  });
});
