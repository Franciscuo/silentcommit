import { BlogPost } from './types'

export const samplePost: BlogPost = {
  id: 'sample-post-1',
  title: 'Building Resilient Systems: Lessons from Production',
  content: `# Building Resilient Systems: Lessons from Production

After years of building and maintaining systems in production, I've learned that resilience isn't just about handling errors—it's about designing systems that gracefully degrade and recover from unexpected failures.

## The Reality of Production

Production environments are chaotic. Services go down, databases become unavailable, and network partitions happen more often than we'd like to admit. The systems that survive and thrive are those built with these realities in mind.

## Key Principles

### 1. Embrace Failure as a First-Class Concept

Don't treat errors as exceptional cases. Build your system assuming things will fail:

\`\`\`typescript
// Instead of hoping external services are always available
async function getUserData(id: string): Promise<User | null> {
  try {
    return await externalService.getUser(id)
  } catch (error) {
    // Graceful degradation - return cached data or safe defaults
    return await getCachedUser(id) || null
  }
}
\`\`\`

### 2. Circuit Breakers and Timeouts

Protect your system from cascading failures:

\`\`\`typescript
class CircuitBreaker {
  private failures = 0
  private lastFailTime = 0
  private state: 'closed' | 'open' | 'half-open' = 'closed'
  
  async call<T>(fn: () => Promise<T>): Promise<T> {
    if (this.state === 'open') {
      if (Date.now() - this.lastFailTime > this.resetTimeout) {
        this.state = 'half-open'
      } else {
        throw new Error('Circuit breaker is open')
      }
    }
    
    try {
      const result = await fn()
      this.reset()
      return result
    } catch (error) {
      this.recordFailure()
      throw error
    }
  }
}
\`\`\`

### 3. Observability is Non-Negotiable

You can't fix what you can't see. Instrument everything:

- **Metrics**: Response times, error rates, throughput
- **Logs**: Structured logging with correlation IDs
- **Traces**: End-to-end request tracing
- **Health checks**: Automated monitoring of system health

## Real-World Example

Last year, our payment processing system experienced a 500% increase in traffic during a flash sale. The lessons we learned:

1. **Auto-scaling saved us**, but only because we had proper health checks
2. **Database connection pooling** prevented connection exhaustion
3. **Graceful degradation** kept the site functional even when payment processing was slow
4. **Detailed monitoring** helped us identify bottlenecks in real-time

## Conclusion

Building resilient systems isn't about preventing all failures—it's about designing systems that continue to function when things go wrong. Start with the assumption that everything will fail, and build from there.

The best systems I've worked on weren't the ones that never failed, but the ones that failed gracefully and recovered quickly.`,
  excerpt: 'After years of building and maintaining systems in production, I\'ve learned that resilience isn\'t just about handling errors—it\'s about designing systems that gracefully degrade and recover from unexpected failures.',
  tags: ['Systems Design', 'Production', 'Architecture', 'Best Practices'],
  createdAt: '2024-01-15T10:00:00.000Z',
  updatedAt: '2024-01-15T10:00:00.000Z',
  published: true
}