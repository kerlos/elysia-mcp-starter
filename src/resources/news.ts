import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
interface NewsArticle {
  id: string;
  title: string;
  content: string;
  author: string;
  publishedAt: string;
  category: string;
}

// Sample news data
const newsArticles: NewsArticle[] = [
  {
    id: 'tech-001',
    title: 'AI Revolution Continues with New Language Models',
    content:
      'The latest breakthrough in artificial intelligence has emerged with the development of more efficient language models that can process complex queries with unprecedented accuracy. These models are being integrated into various applications across industries.',
    author: 'Tech Reporter',
    publishedAt: '2024-01-15T10:30:00Z',
    category: 'technology',
  },
  {
    id: 'biz-001',
    title: 'Global Markets Show Strong Growth in Q4',
    content:
      'Financial markets worldwide have demonstrated robust performance in the fourth quarter, with technology stocks leading the charge. Analysts predict continued growth momentum into the new year.',
    author: 'Financial Analyst',
    publishedAt: '2024-01-14T14:15:00Z',
    category: 'business',
  },
  {
    id: 'sci-001',
    title: 'Scientists Discover New Method for Clean Energy',
    content:
      'Researchers have unveiled a revolutionary approach to generating clean energy that could significantly reduce carbon emissions. The breakthrough combines solar technology with advanced battery storage systems.',
    author: 'Science Correspondent',
    publishedAt: '2024-01-13T09:45:00Z',
    category: 'science',
  },
  {
    id: 'health-001',
    title: 'New Treatment Shows Promise for Common Disease',
    content:
      'Medical researchers have developed a promising new treatment approach that has shown remarkable results in clinical trials. The treatment could benefit millions of patients worldwide.',
    author: 'Medical Reporter',
    publishedAt: '2024-01-12T16:20:00Z',
    category: 'health',
  },
];

export const registerNewsResource = (server: McpServer) => {
  // Register individual news articles as resources
  newsArticles.forEach((article) => {
    server.resource(
      `news://article/${article.id}`,
      `news://article/${article.id}`,
      {
        name: `News Article: ${article.title}`,
        mimeType: 'text/plain',
      },
      async () => {
        const resourceContent = `
Title: ${article.title}
Author: ${article.author}
Published: ${new Date(article.publishedAt).toLocaleDateString()}
Category: ${article.category.toUpperCase()}

${article.content}
        `.trim();

        return {
          contents: [
            {
              uri: `news://article/${article.id}`,
              text: resourceContent,
              mimeType: 'text/plain',
            },
          ],
        };
      }
    );
  });

  // Register a general news feed resource
  server.resource(
    'news://feed/latest',
    'news://feed/latest',
    {
      name: 'Latest News Feed',
      mimeType: 'application/json',
    },
    async () => {
      const feedData = {
        feed: 'Latest News',
        totalArticles: newsArticles.length,
        lastUpdated: new Date().toISOString(),
        articles: newsArticles.map((article) => ({
          id: article.id,
          title: article.title,
          author: article.author,
          publishedAt: article.publishedAt,
          category: article.category,
          excerpt: article.content.substring(0, 150) + '...',
        })),
      };

      return {
        contents: [
          {
            uri: 'news://feed/latest',
            text: JSON.stringify(feedData, null, 2),
            mimeType: 'application/json',
          },
        ],
      };
    }
  );

  // Register category-specific news feeds
  const categories = [
    ...new Set(newsArticles.map((article) => article.category)),
  ];
  categories.forEach((category) => {
    server.resource(
      `news://feed/${category}`,
      `news://feed/${category}`,
      {
        name: `${
          category.charAt(0).toUpperCase() + category.slice(1)
        } News Feed`,
        mimeType: 'application/json',
      },
      async () => {
        const categoryArticles = newsArticles.filter(
          (article) => article.category === category
        );
        const categoryFeed = {
          feed: `${category.charAt(0).toUpperCase() + category.slice(1)} News`,
          category: category,
          totalArticles: categoryArticles.length,
          lastUpdated: new Date().toISOString(),
          articles: categoryArticles.map((article) => ({
            id: article.id,
            title: article.title,
            author: article.author,
            publishedAt: article.publishedAt,
            excerpt: article.content.substring(0, 150) + '...',
          })),
        };

        return {
          contents: [
            {
              uri: `news://feed/${category}`,
              text: JSON.stringify(categoryFeed, null, 2),
              mimeType: 'application/json',
            },
          ],
        };
      }
    );
  });
};
