import {topicContent, TopicSlug} from "@/app/lib/const";

interface TypeScriptSlugProps {
  params: Promise<{ slug: string }>;
}

export default async function TypeScriptSlugPage({ params }: TypeScriptSlugProps) {
  const { slug } = await params;
  const topic = topicContent[slug as TopicSlug];

  if (!topic) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">Topic Not Found</h1>
        <p className="text-gray-600">The TypeScript topic &quot;{slug}&quot; doesn&apos;t exist.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4 text-gray-900">{topic.title}</h1>
      <p className="text-lg mb-6 text-gray-700">{topic.content}</p>

      <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg mb-6">
        <p className="text-sm text-gray-600">
          You&apos;re viewing: <code className="bg-white border px-2 py-1 rounded text-gray-800 font-mono">/typescript/{slug}</code>
        </p>
      </div>

      {/* Generics Examples */}
      {slug === 'generics' && (
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-900">Basic Generic Function:</h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
              <code>{`function getFirst<T>(arr: T[]): T {
  return arr[0];
}

// Usage - TypeScript infers the type
const firstString = getFirst(["hello", "world"]); // Type: string
const firstNumber = getFirst([1, 2, 3]); // Type: number
const firstUser = getFirst([{id: 1, name: "John"}]); // Type: {id: number, name: string}`}</code>
            </pre>
          </div>

          <div className="bg-green-50 border border-green-200 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-green-900">Generic Interface:</h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
              <code>{`interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// Usage
const userResponse: ApiResponse<User> = {
  data: { id: 1, name: "John" },
  status: 200,
  message: "Success"
};

const usersResponse: ApiResponse<User[]> = {
  data: [{ id: 1, name: "John" }, { id: 2, name: "Jane" }],
  status: 200,
  message: "Success"
};`}</code>
            </pre>
          </div>

          <div className="bg-purple-50 border border-purple-200 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-purple-900">Generic Constraints:</h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
              <code>{`interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(arg: T): T {
  console.log(arg.length); // Now we know it has a length property
  return arg;
}

logLength("hello"); // Works - string has length
logLength([1, 2, 3]); // Works - array has length
// logLength(123); // Error - number doesn't have length`}</code>
            </pre>
          </div>
        </div>
      )}

      {/* Interfaces vs Types Examples */}
      {slug === 'interfaces-vs-types' && (
        <div className="space-y-6">
          <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-yellow-900">When to Use Which:</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="bg-white border border-blue-200 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-700 mb-2">Use Interfaces When:</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Defining object shapes</li>
                  <li>Need declaration merging</li>
                  <li>Creating public APIs</li>
                  <li>Need inheritance (extends)</li>
                </ul>
              </div>
              <div className="bg-white border border-green-200 p-4 rounded-lg">
                <h4 className="font-semibold text-green-700 mb-2">Use Types When:</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Need unions or intersections</li>
                  <li>Computing types</li>
                  <li>Creating utility types</li>
                  <li>Primitive type aliases</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-900">Interface Declaration:</h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
              <code>{`interface User {
  id: number;
  name: string;
  email: string;
}

// Interface can be extended
interface AdminUser extends User {
  role: 'admin';
  permissions: string[];
}

// Interface can be merged (declaration merging)
interface User {
  createdAt: Date; // This gets added to the original User interface
}`}</code>
            </pre>
          </div>

          <div className="bg-green-50 border border-green-200 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-green-900">Type Alias:</h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
              <code>{`type User = {
  id: number;
  name: string;
  email: string;
}

// Type can use unions
type Status = 'loading' | 'success' | 'error';

// Type can use complex expressions
type ApiResponse<T> = {
  data: T;
  status: Status;
}

// Type can create computed properties
type UserKeys = keyof User; // "id" | "name" | "email"`}</code>
            </pre>
          </div>
        </div>
      )}

      {/* Utility Types Examples */}
      {slug === 'utility-types' && (
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-900">Partial & Required:</h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
              <code>{`interface User {
  id: number;
  name: string;
  email: string;
  age?: number;
}

// Partial - makes all properties optional
type PartialUser = Partial<User>;
// { id?: number; name?: string; email?: string; age?: number; }

// Required - makes all properties required
type RequiredUser = Required<User>;
// { id: number; name: string; email: string; age: number; }

// Usage
function updateUser(id: number, updates: PartialUser) {
  // Can update just some properties
}`}</code>
            </pre>
          </div>

          <div className="bg-green-50 border border-green-200 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-green-900">Pick & Omit:</h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
              <code>{`interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

// Pick - select specific properties
type UserProfile = Pick<User, 'id' | 'name' | 'email'>;
// { id: number; name: string; email: string; }

// Omit - exclude specific properties
type CreateUser = Omit<User, 'id' | 'createdAt'>;
// { name: string; email: string; password: string; }

// Usage
function displayProfile(user: UserProfile) {
  // Only has id, name, email - no sensitive data
}`}</code>
            </pre>
          </div>

          <div className="bg-purple-50 border border-purple-200 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-purple-900">Record & Readonly:</h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
              <code>{`// Record - create object type with specific key-value types
type UserRoles = Record<string, 'admin' | 'user' | 'guest'>;
// { [key: string]: 'admin' | 'user' | 'guest' }

const roles: UserRoles = {
  john: 'admin',
  jane: 'user',
  bob: 'guest'
};

// Readonly - makes all properties readonly
type ReadonlyUser = Readonly<User>;
// { readonly id: number; readonly name: string; ... }

const config: ReadonlyUser = { id: 1, name: "John", email: "john@example.com" };
// config.name = "Jane"; // Error: Cannot assign to readonly property`}</code>
            </pre>
          </div>
        </div>
      )}

      {/* Advanced Types Examples */}
      {slug === 'advanced-types' && (
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-900">Conditional Types:</h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
              <code>{`// Basic conditional type
type IsString<T> = T extends string ? true : false;

type Test1 = IsString<string>; // true
type Test2 = IsString<number>; // false

// More practical example
type ApiResponse<T> = T extends string 
  ? { message: T } 
  : { data: T };

type StringResponse = ApiResponse<string>; // { message: string }
type UserResponse = ApiResponse<User>; // { data: User }`}</code>
            </pre>
          </div>

          <div className="bg-green-50 border border-green-200 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-green-900">Mapped Types:</h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
              <code>{`// Create a type where all properties are optional and nullable
type Nullable<T> = {
  [P in keyof T]?: T[P] | null;
};

interface User {
  id: number;
  name: string;
  email: string;
}

type NullableUser = Nullable<User>;
// {
//   id?: number | null;
//   name?: string | null;
//   email?: string | null;
// }

// Create getters for all properties
type Getters<T> = {
  [P in keyof T as \`get\${Capitalize<string & P>}\`]: () => T[P];
};

type UserGetters = Getters<User>;
// {
//   getId: () => number;
//   getName: () => string;
//   getEmail: () => string;
// }`}</code>
            </pre>
          </div>

          <div className="bg-purple-50 border border-purple-200 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-purple-900">Template Literal Types:</h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
              <code>{`// Create event types
type EventName = 'click' | 'focus' | 'blur';
type EventHandler<T extends EventName> = \`on\${Capitalize<T>}\`;

type ClickHandler = EventHandler<'click'>; // "onClick"
type FocusHandler = EventHandler<'focus'>; // "onFocus"

// Create CSS properties
type CSSProperty = 'margin' | 'padding';
type CSSDirection = 'top' | 'right' | 'bottom' | 'left';
type CSSDirectionalProperty = \`\${CSSProperty}-\${CSSDirection}\`;

// "margin-top" | "margin-right" | "margin-bottom" | "margin-left" | 
// "padding-top" | "padding-right" | "padding-bottom" | "padding-left"

// URL builder
type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
type Endpoint = '/users' | '/posts' | '/comments';
type APIRoute = \`\${HTTPMethod} \${Endpoint}\`;

// "GET /users" | "POST /users" | "PUT /users" | "DELETE /users" | etc.`}</code>
            </pre>
          </div>

          <div className="bg-orange-50 border border-orange-200 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-orange-900">Utility Type Combinations:</h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
              <code>{`// Combine multiple utility types
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  lastLogin?: Date;
}

// Create a safe user type for API responses
type SafeUser = Omit<User, 'password'> & {
  readonly id: number;
};

// Create update type - optional fields except id
type UserUpdate = Partial<Omit<User, 'id'>> & {
  id: number;
};

// Create a type for form data (no id, no lastLogin)
type UserForm = Omit<User, 'id' | 'lastLogin'>;

// Function that uses these types
function updateUser(update: UserUpdate): Promise<SafeUser> {
  // Implementation
  return Promise.resolve({} as SafeUser);
}`}</code>
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}