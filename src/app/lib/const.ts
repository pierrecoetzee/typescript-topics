export const topicContent = {
  'generics': {
    title: 'TypeScript Generics',
    description: 'Learn how to write reusable, type-safe code by creating components that work with multiple types.',
    content: 'Generics allow you to write reusable, type-safe code by creating components that work with multiple types.',
    color: 'blue'
  },
  'interfaces-vs-types': {
    title: 'Interfaces vs Types',
    description: 'Understand when to use interfaces versus type aliases for writing maintainable TypeScript code.',
    content: 'Understanding when to use interfaces versus type aliases is crucial for writing maintainable TypeScript code.',
    color: 'green'
  },
  'utility-types': {
    title: 'Utility Types',
    description: 'Master built-in utility types like Partial, Pick, Omit, and Record for common type transformations.',
    content: 'TypeScript provides several built-in utility types to facilitate common type transformations and manipulations.',
    color: 'purple'
  },
  'advanced-types': {
    title: 'Advanced Types',
    description: 'Explore conditional types, mapped types, and template literal types for powerful type manipulation.',
    content: 'Explore advanced TypeScript features like conditional types, mapped types, and template literal types for powerful type manipulation.',
    color: 'orange'
  },
} as const;


export type TopicSlug = keyof typeof topicContent;
export type TopicData = typeof topicContent[TopicSlug];

// For layout navigation
export const layoutTopicContent: Record<string, { title: string }> = {
  'generics': { title: 'Generics' },
  'interfaces-vs-types': { title: 'Interfaces vs Types' },
  'utility-types': { title: 'Utility Types' },
  'advanced-types': { title: 'Advanced Types' },
};