import { BlogPost } from './types'

export const blogPosts: BlogPost[] = [
  {
    id: 'building-resilient-systems',
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
  },
  {
    id: 'typescript-patterns-real-world',
    title: 'TypeScript Patterns That Actually Matter in Real Projects',
    content: `# TypeScript Patterns That Actually Matter in Real Projects

TypeScript has transformed how we write JavaScript, but not all patterns are created equal. After working on large-scale TypeScript projects, here are the patterns that consistently add value without unnecessary complexity.

## 1. Discriminated Unions for State Management

Instead of optional properties, use discriminated unions to represent different states:

\`\`\`typescript
// ❌ Unclear state representation
interface ApiResponse {
  data?: User[]
  error?: string
  loading?: boolean
}

// ✅ Clear, type-safe state
type ApiState = 
  | { status: 'loading' }
  | { status: 'success'; data: User[] }
  | { status: 'error'; error: string }
\`\`\`

This pattern eliminates impossible states and makes your code more predictable.

## 2. Branded Types for Domain Modeling

Use branded types to create semantic meaning:

\`\`\`typescript
type UserId = string & { readonly brand: unique symbol }
type PostId = string & { readonly brand: unique symbol }

function createUserId(id: string): UserId {
  return id as UserId
}

// This prevents mixing up different ID types
function getUser(id: UserId): Promise<User> {
  // implementation
}
\`\`\`

## 3. Builder Pattern with Fluent Interface

For complex object construction:

\`\`\`typescript
class QueryBuilder {
  private query: string = ''
  
  select(fields: string[]): this {
    this.query += \`SELECT \${fields.join(', ')} \`
    return this
  }
  
  from(table: string): this {
    this.query += \`FROM \${table} \`
    return this
  }
  
  where(condition: string): this {
    this.query += \`WHERE \${condition} \`
    return this
  }
  
  build(): string {
    return this.query.trim()
  }
}

const query = new QueryBuilder()
  .select(['name', 'email'])
  .from('users')
  .where('active = true')
  .build()
\`\`\`

## 4. Generic Constraints for Better APIs

Use generic constraints to create flexible yet type-safe APIs:

\`\`\`typescript
interface Identifiable {
  id: string
}

function updateEntity<T extends Identifiable>(
  entity: T, 
  updates: Partial<Omit<T, 'id'>>
): T {
  return { ...entity, ...updates }
}
\`\`\`

## Conclusion

Focus on patterns that solve real problems in your codebase. TypeScript's power lies in making invalid states unrepresentable and catching errors at compile time.`,
    excerpt: 'TypeScript has transformed how we write JavaScript, but not all patterns are created equal. Here are the patterns that consistently add value without unnecessary complexity.',
    tags: ['TypeScript', 'Patterns', 'Best Practices', 'JavaScript'],
    createdAt: '2024-01-20T14:30:00.000Z',
    updatedAt: '2024-01-20T14:30:00.000Z',
    published: true
  },
  {
    id: 'react-performance-guide',
    title: 'React Performance: What Actually Matters',
    content: `# React Performance: What Actually Matters

Performance optimization in React often involves premature optimization. Here's what to focus on based on real-world experience with large React applications.

## 1. Measure First, Optimize Second

Before optimizing anything, understand what's actually slow:

\`\`\`typescript
// Use React DevTools Profiler
// Use browser performance tab
// Measure real user metrics

function PerformanceWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const startTime = performance.now()
    
    return () => {
      const endTime = performance.now()
      console.log(\`Component rendered in \${endTime - startTime}ms\`)
    }
  })
  
  return <>{children}</>
}
\`\`\`

## 2. List Virtualization for Large Datasets

When rendering thousands of items, virtualization is essential:

\`\`\`typescript
import { FixedSizeList as List } from 'react-window'

function VirtualizedList({ items }: { items: Item[] }) {
  const Row = ({ index, style }: { index: number; style: any }) => (
    <div style={style}>
      <ItemComponent item={items[index]} />
    </div>
  )
  
  return (
    <List
      height={600}
      itemCount={items.length}
      itemSize={50}
    >
      {Row}
    </List>
  )
}
\`\`\`

## 3. Smart Memoization Strategy

Don't memo everything. Focus on expensive computations:

\`\`\`typescript
// ❌ Unnecessary memoization
const SimpleComponent = memo(({ name }: { name: string }) => (
  <div>{name}</div>
))

// ✅ Useful memoization
const ExpensiveChart = memo(({ data }: { data: ChartData[] }) => {
  const processedData = useMemo(() => {
    return data.map(item => ({
      ...item,
      computed: expensiveCalculation(item.value)
    }))
  }, [data])
  
  return <Chart data={processedData} />
})
\`\`\`

## 4. Code Splitting at Route Level

Split your app by routes, not components:

\`\`\`typescript
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Settings = lazy(() => import('./pages/Settings'))

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Suspense>
  )
}
\`\`\`

## Conclusion

Focus on user-perceptible performance improvements: faster loading, smoother interactions, and responsive UI. The rest is often premature optimization.`,
    excerpt: 'Performance optimization in React often involves premature optimization. Here\'s what to focus on based on real-world experience with large React applications.',
    tags: ['React', 'Performance', 'Optimization', 'Frontend'],
    createdAt: '2024-01-25T09:15:00.000Z',
    updatedAt: '2024-01-25T09:15:00.000Z',
    published: true
  },
  {
    id: 'microservices-lessons-learned',
    title: 'Microservices: Hard-Won Lessons from 3 Years in Production',
    content: `# Microservices: Hard-Won Lessons from 3 Years in Production

Three years ago, we migrated from a monolith to microservices. Here's what we learned, including what we got wrong and what we'd do differently.

## What We Got Right

### 1. Domain-Driven Service Boundaries

We split services along business domains, not technical layers:

\`\`\`
✅ Good boundaries:
- User Service (authentication, profiles)
- Order Service (order management, fulfillment)
- Payment Service (billing, transactions)

❌ Bad boundaries:
- Database Service
- API Gateway Service
- Logging Service
\`\`\`

### 2. Independent Deployments

Each service has its own CI/CD pipeline:

\`\`\`yaml
# service-deployment.yml
name: Deploy User Service
on:
  push:
    branches: [main]
    paths: ['services/user/**']

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to Kubernetes
        run: kubectl apply -f k8s/user-service/
\`\`\`

## What We Got Wrong

### 1. Too Many Services, Too Soon

We started with 12 services for a team of 6 developers. Big mistake. The coordination overhead was crushing.

**Lesson**: Start with 2-3 services max. Split only when team size or complexity demands it.

### 2. Synchronous Communication Everywhere

We made everything a REST API call:

\`\`\`typescript
// ❌ Synchronous coupling
async function createOrder(orderData: OrderData) {
  const user = await userService.getUser(orderData.userId)
  const payment = await paymentService.processPayment(orderData.payment)
  const inventory = await inventoryService.reserveItems(orderData.items)
  
  return await orderService.createOrder({ user, payment, inventory })
}
\`\`\`

**Better approach**: Event-driven architecture for non-critical paths:

\`\`\`typescript
// ✅ Asynchronous, resilient
async function createOrder(orderData: OrderData) {
  const order = await orderService.createOrder(orderData)
  
  // Publish events for other services to react
  await eventBus.publish('order.created', {
    orderId: order.id,
    userId: orderData.userId,
    items: orderData.items
  })
  
  return order
}
\`\`\`

### 3. Shared Databases

We initially shared databases between services to "reduce complexity." This created tight coupling and deployment nightmares.

**Lesson**: Each service should own its data completely.

## The Real Benefits (When Done Right)

1. **Team Autonomy**: Teams can deploy independently without coordination
2. **Technology Diversity**: Use the right tool for each job
3. **Scalability**: Scale only the services that need it
4. **Fault Isolation**: One service failure doesn't bring down everything

## When NOT to Use Microservices

- Small team (< 10 developers)
- Simple domain
- Rapid prototyping phase
- Limited operational expertise

## Conclusion

Microservices aren't a silver bullet. They trade complexity in code for complexity in operations. Make sure you have the team size, domain complexity, and operational maturity to handle that trade-off.

Start with a modular monolith. Extract services only when you feel the pain of coupling.`,
    excerpt: 'Three years ago, we migrated from a monolith to microservices. Here\'s what we learned, including what we got wrong and what we\'d do differently.',
    tags: ['Microservices', 'Architecture', 'Production', 'Lessons Learned'],
    createdAt: '2024-02-01T16:45:00.000Z',
    updatedAt: '2024-02-01T16:45:00.000Z',
    published: true
  },
  {
    id: 'debugging-production-issues',
    title: 'Debugging Production Issues: A Systematic Approach',
    content: `# Debugging Production Issues: A Systematic Approach

Production bugs are inevitable. What matters is how quickly and systematically you can identify and fix them. Here's the approach that has served me well through countless 3 AM debugging sessions.

## The Four-Phase Framework

### Phase 1: Stabilize (0-15 minutes)

Before investigating the root cause, stop the bleeding:

1. **Check system health dashboards**
2. **Roll back if recent deployment**
3. **Scale up if it's a capacity issue**
4. **Enable circuit breakers if needed**

\`\`\`bash
# Quick health check commands
kubectl get pods --field-selector=status.phase!=Running
kubectl top nodes
kubectl describe pod <failing-pod>
\`\`\`

### Phase 2: Gather Evidence (15-45 minutes)

Collect data before it gets rotated out:

\`\`\`typescript
// Log correlation example
const correlationId = req.headers['x-correlation-id'] || generateId()

logger.info('Processing request', {
  correlationId,
  userId: req.user.id,
  endpoint: req.path,
  timestamp: new Date().toISOString()
})
\`\`\`

**Essential data to collect:**
- Error logs with correlation IDs
- System metrics during the incident
- User session replays (if available)
- Database slow query logs
- Network latency metrics

### Phase 3: Hypothesis and Test (45-90 minutes)

Form hypotheses and test them systematically:

\`\`\`typescript
// Example: Testing database connection hypothesis
async function testDatabaseHypothesis() {
  try {
    const start = performance.now()
    await db.query('SELECT 1')
    const duration = performance.now() - start
    
    console.log(\`DB query took \${duration}ms\`)
    
    if (duration > 1000) {
      console.log('Database latency is high - investigating connection pool')
      return 'database_latency'
    }
  } catch (error) {
    console.log('Database connection failed:', error.message)
    return 'database_connection'
  }
  
  return 'database_healthy'
}
\`\`\`

### Phase 4: Fix and Verify (90+ minutes)

Implement the fix and verify it works:

1. **Deploy fix to staging first**
2. **Monitor key metrics after production deployment**
3. **Have a rollback plan ready**

## Essential Tools and Techniques

### 1. Distributed Tracing

Track requests across service boundaries:

\`\`\`typescript
import { trace } from '@opentelemetry/api'

async function processOrder(orderId: string) {
  const span = trace.getActiveSpan()
  span?.setAttributes({
    'order.id': orderId,
    'service.name': 'order-processor'
  })
  
  try {
    const result = await orderService.process(orderId)
    span?.setStatus({ code: SpanStatusCode.OK })
    return result
  } catch (error) {
    span?.setStatus({ 
      code: SpanStatusCode.ERROR,
      message: error.message
    })
    throw error
  }
}
\`\`\`

### 2. Feature Flags for Quick Rollbacks

\`\`\`typescript
if (featureFlag.isEnabled('new-payment-flow', userId)) {
  return await processPaymentV2(paymentData)
} else {
  return await processPaymentV1(paymentData)
}
\`\`\`

### 3. Structured Logging

\`\`\`typescript
// ❌ Unstructured logging
console.log(\`User \${userId} failed to process order \${orderId}\`)

// ✅ Structured logging
logger.error('Order processing failed', {
  userId,
  orderId,
  error: error.message,
  stack: error.stack,
  correlationId: req.correlationId
})
\`\`\`

## Common Anti-Patterns to Avoid

1. **Panicking and making random changes**
2. **Not preserving evidence before "fixing"**
3. **Fixing symptoms instead of root causes**
4. **Not documenting the incident and resolution**

## Post-Mortem: Learning from Incidents

Every production issue is a learning opportunity:

\`\`\`markdown
## Incident: Payment Processing Failures

**Timeline:**
- 14:30: First payment failure alerts
- 14:45: Identified database connection pool exhaustion
- 15:00: Scaled up connection pool size
- 15:15: Issue resolved

**Root Cause:**
Database connection pool was too small for increased traffic

**Action Items:**
1. Implement auto-scaling for connection pools
2. Add alerting for connection pool utilization
3. Load test payment flow with 2x expected traffic
\`\`\`

## Conclusion

Debugging production issues is part detective work, part systematic process. Having a framework helps you stay calm and methodical when everything is on fire.

Remember: the goal isn't just to fix the immediate issue, but to prevent similar issues in the future.`,
    excerpt: 'Production bugs are inevitable. What matters is how quickly and systematically you can identify and fix them. Here\'s a proven approach for debugging production issues.',
    tags: ['Debugging', 'Production', 'DevOps', 'Incident Response'],
    createdAt: '2024-02-10T11:20:00.000Z',
    updatedAt: '2024-02-10T11:20:00.000Z',
    published: true
  }
]

export function getAllPosts(): BlogPost[] {
  return blogPosts.filter(post => post.published)
}

export function getPostById(id: string): BlogPost | undefined {
  return blogPosts.find(post => post.id === id)
}

export function getPostsByTag(tag: string): BlogPost[] {
  return blogPosts.filter(post => 
    post.published && post.tags.includes(tag)
  )
}

export function getAllTags(): string[] {
  const tags = new Set<string>()
  blogPosts.forEach(post => {
    if (post.published) {
      post.tags.forEach(tag => tags.add(tag))
    }
  })
  return Array.from(tags).sort()
}