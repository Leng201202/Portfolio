import React, { useState } from 'react'
import NavBar from '../../components/utils/NavBar'
import Footer from '../../components/utils/Footer'
import usePortfolioStore from '../../store/usePortfolioStore'

export const Blog = () => {
  const adminBlogPosts = usePortfolioStore((state) => state.blogPosts);
  
  // Helper function to format plain text content into paragraphs
  const formatContent = (text) => {
    if (!text) return '';
    
    // Split by double line breaks for paragraphs
    const paragraphs = text.trim().split('\n\n');
    
    return paragraphs.map((para, index) => {
      const trimmedPara = para.trim();
      
      // Check if it's a heading (starts with #)
      if (trimmedPara.startsWith('### ')) {
        return <h3 key={index} className="text-2xl font-bold mt-6 mb-3">{trimmedPara.substring(4)}</h3>;
      } else if (trimmedPara.startsWith('## ')) {
        return <h2 key={index} className="text-3xl font-bold mt-8 mb-4">{trimmedPara.substring(3)}</h2>;
      } else if (trimmedPara.startsWith('# ')) {
        return <h1 key={index} className="text-4xl font-bold mt-8 mb-4">{trimmedPara.substring(2)}</h1>;
      }
      // Check if it's a code block (starts and ends with ```)
      else if (trimmedPara.startsWith('```') && trimmedPara.endsWith('```')) {
        const code = trimmedPara.slice(3, -3).trim();
        return (
          <pre key={index} className="bg-base-200 p-4 rounded-lg overflow-x-auto my-4">
            <code className="text-sm">{code}</code>
          </pre>
        );
      }
      // Check if it's a list item (starts with - or *)
      else if (trimmedPara.includes('\n-') || trimmedPara.includes('\n*') || trimmedPara.startsWith('-') || trimmedPara.startsWith('*')) {
        const items = trimmedPara.split('\n').filter(line => line.trim().startsWith('-') || line.trim().startsWith('*'));
        return (
          <ul key={index} className="list-disc list-inside my-4 space-y-2">
            {items.map((item, i) => (
              <li key={i}>{item.trim().substring(1).trim()}</li>
            ))}
          </ul>
        );
      }
      // Regular paragraph
      else {
        return <p key={index} className="mb-4 leading-relaxed">{trimmedPara}</p>;
      }
    });
  };

  // Sample blog posts data - you can later fetch this from your backend
  const defaultBlogPosts = [
    {
      id: 1,
      title: "Getting Started with React and TailwindCSS",
      excerpt: "Learn how to set up a modern React application with TailwindCSS for beautiful, responsive designs.",
      content: `React and TailwindCSS make a powerful combination for building modern web applications. In this post, we'll explore how to get started with both technologies.

### Why React?

React is a popular JavaScript library for building user interfaces, especially single-page applications. It allows developers to create reusable UI components.

### Why TailwindCSS?

TailwindCSS is a utility-first CSS framework that provides low-level utility classes to build custom designs without writing custom CSS.

### Setting Up Your Project

To get started, you'll need Node.js installed. Then, create a new React app and install TailwindCSS.

\`\`\`
npm create vite@latest my-app -- --template react
cd my-app
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
\`\`\`

### Key Benefits

- Component-based architecture
- Virtual DOM for better performance
- Large ecosystem and community
- Easy to learn and use

Happy coding!`,
      author: "Your Name",
      date: "2026-01-20",
      readTime: "5 min read",
      category: "Web Development",
      tags: ["React", "TailwindCSS", "Frontend"],
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop"
    },
    {
      id: 2,
      title: "Building RESTful APIs with NestJS",
      excerpt: "Discover how to create scalable and maintainable backend services using NestJS framework.",
      content: `NestJS is a progressive Node.js framework for building efficient and scalable server-side applications. Let's dive into creating RESTful APIs.

### What is NestJS?

NestJS is built with TypeScript and combines elements of OOP, FP, and FRP. It provides an architecture that helps developers create highly testable, scalable, and maintainable applications.

### Core Concepts

- Controllers: Handle incoming requests and return responses
- Providers: Can be injected as dependencies
- Modules: Organize the application structure
- Middleware: Process requests before they reach route handlers
- Guards: Determine whether a request should be handled

### Creating Your First Endpoint

Here's a simple example of a controller:

\`\`\`
@Controller('users')
export class UsersController {
  @Get()
  findAll() {
    return 'This action returns all users';
  }
  
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }
}
\`\`\`

### Best Practices

Start with a solid project structure, use dependency injection effectively, and always validate incoming data with DTOs. NestJS makes it easy to build production-ready APIs.`,
      author: "Your Name",
      date: "2026-01-15",
      readTime: "7 min read",
      category: "Backend",
      tags: ["NestJS", "Node.js", "API"],
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop"
    },
    {
      id: 3,
      title: "Database Design with Prisma ORM",
      excerpt: "Master database management with Prisma, the next-generation ORM for Node.js and TypeScript.",
      content: `Prisma is a next-generation ORM that makes database access easy with type safety and auto-completion.

### Why Prisma?

Prisma provides a clean and type-safe way to interact with your database. It supports PostgreSQL, MySQL, SQLite, SQL Server, and MongoDB.

### Key Features

- Type-safe database access
- Auto-generated and type-safe query builder
- Declarative data modeling
- Migration system
- Introspection capabilities

### Schema Example

\`\`\`
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  posts     Post[]
  createdAt DateTime @default(now())
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  published Boolean  @default(false)
  author    User     @relation(fields: [authorId], references: [id])
  authorId  Int
}
\`\`\`

### Getting Started

Install Prisma, initialize your schema, and run migrations to get started. The developer experience is exceptional with full TypeScript support and IDE autocomplete.`,
      author: "Your Name",
      date: "2026-01-10",
      readTime: "6 min read",
      category: "Database",
      tags: ["Prisma", "Database", "ORM"],
      image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&h=400&fit=crop"
    },
    {
      id: 4,
      title: "Responsive Design Best Practices",
      excerpt: "Learn the essential principles of creating responsive web designs that work seamlessly across all devices.",
      content: `Responsive design is crucial in today's multi-device world. Let's explore best practices for creating truly responsive applications.

### Mobile-First Approach

Start designing for mobile devices first, then scale up to larger screens. This ensures your core content and functionality work on the smallest screens.

### Flexible Layouts

Use flexible grid layouts with percentage-based widths rather than fixed pixel values. CSS Grid and Flexbox are your best friends for creating responsive layouts.

### Media Queries

Leverage media queries to apply different styles based on screen size:

\`\`\`
@media (min-width: 768px) {
  .container {
    max-width: 768px;
  }
}

@media (min-width: 1024px) {
  .container {
    max-width: 1024px;
  }
}
\`\`\`

### Responsive Images

Use responsive image techniques to serve appropriate image sizes for different devices. Consider using srcset and sizes attributes.

### Testing Across Devices

Always test your designs on real devices, not just browser developer tools. Different devices can behave differently.

### Key Principles

- Use relative units (rem, em, %) instead of pixels
- Design for touch interfaces
- Optimize performance for mobile networks
- Ensure text remains readable at all sizes
- Make interactive elements large enough for touch

By following these practices, you'll create websites that look great and function well on any device.`,
      author: "Your Name",
      date: "2026-01-05",
      readTime: "4 min read",
      category: "Design",
      tags: ["CSS", "Responsive", "Design"],
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop"
    }
  ];

  // Use admin blog posts if available, otherwise use default sample data
  const blogPosts = adminBlogPosts.length > 0 ? adminBlogPosts : defaultBlogPosts;

  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // Get unique categories
  const categories = ["All", ...new Set(blogPosts.map(post => post.category))];

  // Filter posts by category
  const filteredPosts = selectedCategory === "All" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const handleReadMore = (post) => {
    setSelectedPost(post);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToBlog = () => {
    setSelectedPost(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page when category changes
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (selectedPost) {
    return (
      <>
        <NavBar />
        <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <button 
            onClick={handleBackToBlog}
            className="btn btn-ghost mb-6 gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to Blog
          </button>

          {/* Post Header */}
          <article className="card bg-base-100 shadow-xl">
            <figure className="h-64 sm:h-96">
              <img 
                src={selectedPost.image} 
                alt={selectedPost.title}
                className="w-full h-full object-cover"
              />
            </figure>
            
            <div className="card-body p-6 sm:p-8">
              {/* Category Badge */}
              <div className="mb-4">
                <span className="badge badge-primary badge-lg">{selectedPost.category}</span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl font-bold mb-4">{selectedPost.title}</h1>

              {/* Meta Information */}
              <div className="flex flex-wrap gap-4 text-base-content/70 mb-6 pb-6 border-b border-base-300">
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                  <span>{selectedPost.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                  </svg>
                  <span>{new Date(selectedPost.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{selectedPost.readTime}</span>
                </div>
              </div>

              {/* Content */}
              <div className="prose prose-lg max-w-none prose-headings:text-base-content prose-p:text-base-content/80 prose-strong:text-base-content prose-code:text-base-content prose-pre:bg-base-200 prose-ul:text-base-content/80 prose-li:text-base-content/80">
                {formatContent(selectedPost.content)}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-base-300">
                {selectedPost.tags.map((tag, idx) => (
                  <div key={idx} className="badge badge-outline badge-lg">{tag}</div>
                ))}
              </div>
            </div>
          </article>
        </div>
      </div>
      <Footer />
      </>
    );
  }

  return (
    <>
      <NavBar />
      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Blog</h1>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Thoughts, tutorials, and insights about web development, programming, and technology.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`btn btn-sm ${
                selectedCategory === category 
                  ? 'btn-primary' 
                  : 'btn-outline'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentPosts.map((post) => (
            <div 
              key={post.id} 
              className="card bg-base-100 shadow-sm hover:shadow-xl transition-shadow duration-300 cursor-pointer group"
              onClick={() => handleReadMore(post)}
            >
              <figure className="h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </figure>
              <div className="card-body">
                <div className="flex items-center justify-between mb-2">
                  <span className="badge badge-primary">{post.category}</span>
                  <span className="text-sm text-base-content/60">{post.readTime}</span>
                </div>
                
                <h2 className="card-title group-hover:text-primary transition-colors">
                  {post.title}
                </h2>
                
                <p className="text-base-content/70 line-clamp-3">{post.excerpt}</p>
                
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-base-300">
                  <div className="flex items-center gap-2 text-sm text-base-content/60">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                    </svg>
                    {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </div>
                  
                  <button className="btn btn-ghost btn-sm group-hover:text-primary">
                    Read More
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </button>
                </div>
                
                <div className="card-actions justify-start mt-2">
                  {post.tags.slice(0, 3).map((tag, idx) => (
                    <div key={idx} className="badge badge-outline badge-sm">{tag}</div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <div className="join">
              <button 
                className="join-item btn"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                «
              </button>
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  className={`join-item btn ${currentPage === index + 1 ? 'btn-active' : ''}`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
              <button 
                className="join-item btn"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                »
              </button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-base-content/70">No blog posts found in this category.</p>
          </div>
        )}
      </div>
    </div>
    <Footer />
    </>
  );
}
