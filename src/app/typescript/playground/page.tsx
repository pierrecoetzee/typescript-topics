// TypeScript Playground component
const TypeScriptPlaygroundEmbed = ({ code, height = "600px" }: { code: string, height?: string }) => {
  // Encode the code for URL
  const encodedCode = encodeURIComponent(code);

  // TypeScript Playground URL with TypeScript 5.4 specified
  const playgroundUrl = `https://www.typescriptlang.org/play?ts=5.4.5&target=1&module=1&code=${encodedCode}`;

  return (
    <div className="my-6">
      <div className="bg-blue-50 border border-blue-200 p-4 rounded-t-lg">
        <h4 className="text-blue-800 font-semibold">🚀 TypeScript Playground (v5.4.5)</h4>
        <p className="text-sm text-blue-600 mt-1">
          Your TypeScript code is pre-loaded with TypeScript 5.4.5. Click &quot;Run&quot; in the playground to see console output.
        </p>
      </div>
      <div className="border border-blue-200 rounded-b-lg overflow-hidden">
        <iframe
          src={playgroundUrl}
          width="100%"
          height={height}
          frameBorder="0"
          title="TypeScript Playground"
          className="w-full"
        />
        <div className="bg-gray-50 p-2 border-t">
          <a
            href={playgroundUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            🔗 Open in new tab for better experience
          </a>
        </div>
      </div>
    </div>
  );
};

export default function TypeScriptPlaygroundPage() {
  // Your TypeScript code from the file
  const typeScriptCode = `export {};

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
  } catch (error) {
    return {
      success: false,
      error: 'Failed to fetch user'
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

type adminRoles = 'admin' | 'user';

interface IGenericUser extends IUser {
  permissions?: string[];
  role?: adminRoles;
}

type Getters<T> = {
  [P in keyof T as \`get\${Capitalize<string & P>}\`]: () => T[P];
}

type UserGetters = Getters<IUser>;
type AdminUserGetters = Getters<IGenericUser>;

// Example implementation of a class using Getters
class UserWithGetters implements AdminUserGetters, UserGetters {
  private user: IGenericUser; // Changed to IGenericUser to fix the role issue

  constructor(user: IGenericUser) {
    this.user = user;
  }

  getRole(): adminRoles | undefined {
    return this.user.role; // Now this works!
  }

  getPermissions(): string[] {
    return this.user.role === 'admin' ? ['view', 'edit', 'delete'] : ['view']
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
let users: IGenericUser[] = [{
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
  }];

users.forEach(user => {
  const userInstance = new UserWithGetters(user);
  console.log(\`User \${user.id}:\`);
  console.log('- Name:', userInstance.getName());
  console.log('- Email:', userInstance.getEmail());
  console.log('- Age:', userInstance.getAge());
  console.log('- Role:', userInstance.getRole());
  console.log('- Permissions:', userInstance.getPermissions());
  console.log('---');
});

console.log('All users processed!');`;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4 text-gray-900">TypeScript Playground</h1>
      <p className="text-lg mb-6 text-gray-700">
        Interactive TypeScript code editor with your custom code pre-loaded using TypeScript 5.4.5.
        This includes interfaces, generics, utility types, and more!
      </p>

      <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg mb-6">
        <p className="text-sm text-gray-600">
          You&apos;re viewing: <code className="bg-white border px-2 py-1 rounded text-gray-800 font-mono">/typescript/playground</code>
        </p>
        <p className="text-sm text-gray-600 mt-2">
          💡 <strong>Tip:</strong> Click &quot;Run&quot; in the playground to see console output.
          The code demonstrates TypeScript interfaces, error handling, and type safety.
        </p>
        <p className="text-sm text-blue-600 mt-1">
          🔧 <strong>Version:</strong> Using TypeScript 5.4.5 for the latest features and improvements.
        </p>
      </div>

      <TypeScriptPlaygroundEmbed code={typeScriptCode} height="700px" />

      {/* Code Overview */}
      <div className="mt-8 space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">What&apos;s in this code?</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">🔧 Interfaces & Types</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• IUser and IPublicUser interfaces</li>
              <li>• Generic types and utility types</li>
              <li>• Error handling with union types</li>
            </ul>
          </div>

          <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
            <h3 className="font-semibold text-green-900 mb-2">⚡ Functions & Classes</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Async/await with proper typing</li>
              <li>• Class with getter methods</li>
              <li>• Array processing and logging</li>
            </ul>
          </div>

          <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg">
            <h3 className="font-semibold text-purple-900 mb-2">🚀 Advanced Features</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Mapped types with Capitalize</li>
              <li>• Template literal types</li>
              <li>• Type guards and narrowing</li>
            </ul>
          </div>

          <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg">
            <h3 className="font-semibold text-orange-900 mb-2">🎯 Console Output</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• User role determination</li>
              <li>• API response simulation</li>
              <li>• Detailed user information</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}