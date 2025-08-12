import Link from 'next/link';
import {topicContent, TopicData, TopicSlug} from "@/app/lib/const";

const colorClasses = {
  blue: {
    border: 'border-blue-200',
    bg: 'bg-blue-50',
    text: 'text-blue-900',
    link: 'text-blue-600 hover:text-blue-800'
  },
  green: {
    border: 'border-green-200',
    bg: 'bg-green-50',
    text: 'text-green-900',
    link: 'text-green-600 hover:text-green-800'
  },
  purple: {
    border: 'border-purple-200',
    bg: 'bg-purple-50',
    text: 'text-purple-900',
    link: 'text-purple-600 hover:text-purple-800'
  },
  orange: {
    border: 'border-orange-200',
    bg: 'bg-orange-50',
    text: 'text-orange-900',
    link: 'text-orange-600 hover:text-orange-800'
  }
};

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Welcome to Our Interview Preparation Site</h1>
      <p className="text-lg text-gray-600 mb-8">
        Explore our comprehensive collection of TypeScript topics and interview questions.
      </p>

      {/* Overview TypeScript Card */}
      <div className="mb-8">
        <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow bg-gray-50">
          <h2 className="text-2xl font-semibold mb-3 text-gray-900">TypeScript Overview</h2>
          <p className="text-gray-600 mb-4">
            Master TypeScript fundamentals including generics, interfaces, utility types, and advanced type patterns.
          </p>
        </div>
      </div>

      {/* Individual Topic Cards */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">Individual Topics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(Object.entries(topicContent) as [TopicSlug, TopicData][]).map(([slug, topic]: [TopicSlug, TopicData])  => {
            const colors = colorClasses[topic.color as keyof typeof colorClasses];

            return (
              <div
                key={slug}
                className={`border ${colors.border} ${colors.bg} rounded-lg p-6 hover:shadow-md transition-shadow`}
              >
                <h3 className={`text-xl font-semibold mb-3 ${colors.text}`}>
                  {topic.title}
                </h3>
                <p className="text-gray-700 mb-4">
                  {topic.description}
                </p>
                <Link
                  href={`/typescript/${slug}`}
                  className={`${colors.link} font-medium hover:underline`}
                >
                  Learn {topic.title} →
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">What You&apos;ll Learn</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-4">
            <div className="text-2xl font-bold text-blue-600 mb-2">4</div>
            <div className="text-sm text-gray-600">Core Topics</div>
          </div>
          <div className="p-4">
            <div className="text-2xl font-bold text-green-600 mb-2">20+</div>
            <div className="text-sm text-gray-600">Code Examples</div>
          </div>
          <div className="p-4">
            <div className="text-2xl font-bold text-purple-600 mb-2">15+</div>
            <div className="text-sm text-gray-600">Utility Types</div>
          </div>
          <div className="p-4">
            <div className="text-2xl font-bold text-orange-600 mb-2">∞</div>
            <div className="text-sm text-gray-600">Practice</div>
          </div>
        </div>
      </div>
    </div>
  );
}