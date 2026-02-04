export const parseTemplate = (template: string, data: { resumeUrl: string, githubUrl: string }) => {
  return template
    .replace('{{RESUME_URL}}', data.resumeUrl)
    .replace('{{GITHUB_URL}}', data.githubUrl)
    .replace('{{PORTFOLIO_URL}}', "https://lalitkishor.vercel.app")
}

export const emailTemplates = [
  {
    name: 'Full Stack Engineer',
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <p>Dear Hiring Manager,</p>

        <p>I am Lalitkishor Kanojiya, a Full Stack Developer with nearly two years of experience building scalable, high-performance web applications using React, TypeScript, Node.js, and modern databases. I specialize in developing end-to-end features, improving system performance, and building secure production-ready systems.</p>

        <p>Highlights of my expertise include:</p>
        <ul>
          <li>Strong command of React.js, TypeScript, Node.js, and RESTful API development.</li>
          <li>Designed secure authentication systems using JWT, OAuth2, and RBAC.</li>
          <li>Optimized frontend and backend performance, reducing load and response times by up to 40–50%.</li>
        </ul>

        <p>You can explore my work here:</p>
        <p><a href="{{RESUME_URL}}" style="text-decoration: none; color: #0073e6;">View My Resume</a></p>
        <p><a href="{{GITHUB_URL}}" style="text-decoration: none; color: #0073e6;">Visit My GitHub Profile</a></p>
        <p><a href="{{PORTFOLIO_URL}}" style="text-decoration: none; color: #0073e6;">View My Portfolio</a></p>

        <p>Thank you for considering my application. I look forward to the opportunity to contribute to your team.</p>

        <p>Warm regards,<br><strong>Lalitkishor Kanojiya</strong><br>+91-9510134664</p>
      </div>
    `
  },
  {
    name: 'Frontend Engineer',
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <p>Dear Hiring Manager,</p>

        <p>My name is Lalitkishor Kanojiya, and I am a Frontend-focused Full Stack Developer with strong expertise in React.js, TypeScript, and performance-driven UI engineering. I build responsive, scalable interfaces with a focus on usability, clean architecture, and efficient rendering.</p>

        <p>Some of my key strengths include:</p>
        <ul>
          <li>Developing modern React applications with optimized state management and API integration.</li>
          <li>Improving frontend performance through smart caching, lazy loading, and reduced re-renders.</li>
          <li>Collaborating with backend and design teams to deliver polished, production-ready user experiences.</li>
        </ul>

        <p>Discover more about my work:</p>
        <p><a href="{{RESUME_URL}}" style="text-decoration: none; color: #0073e6;">View My Resume</a></p>
        <p><a href="{{GITHUB_URL}}" style="text-decoration: none; color: #0073e6;">Visit My GitHub Profile</a></p>
        <p><a href="{{PORTFOLIO_URL}}" style="text-decoration: none; color: #0073e6;">View My Portfolio</a></p>

        <p>Thank you for your time and consideration. I would be excited to contribute to your frontend engineering efforts.</p>

        <p>Sincerely,<br><strong>Lalitkishor Kanojiya</strong><br>+91-9510134664</p>
      </div>
    `
  },
  {
    name: 'Backend Engineer',
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <p>Dear Hiring Manager,</p>

        <p>I am Lalitkishor Kanojiya, a Backend-focused Full Stack Developer with strong experience in Node.js and Express.js, building secure, scalable APIs and backend systems. My work focuses on performance optimization, clean architecture, and reliable production deployments.</p>

        <p>Here’s what I bring to the role:</p>
        <ul>
          <li>Designing RESTful APIs with proper validation, error handling, and security best practices.</li>
          <li>Implementing authentication and authorization using JWT, OAuth2, RBAC, and secure session handling.</li>
          <li>Optimizing database queries and backend logic to significantly reduce response times.</li>
        </ul>

        <p>You can review my work here:</p>
        <p><a href="{{RESUME_URL}}" style="text-decoration: none; color: #0073e6;">View My Resume</a></p>
        <p><a href="{{GITHUB_URL}}" style="text-decoration: none; color: #0073e6;">Visit My GitHub Profile</a></p>
        <p><a href="{{PORTFOLIO_URL}}" style="text-decoration: none; color: #0073e6;">View My Portfolio</a></p>

        <p>I would welcome the opportunity to contribute my backend expertise to your team. Thank you for considering my application.</p>

        <p>Best regards,<br><strong>Lalitkishor Kanojiya</strong><br>+91-9510134664</p>
      </div>
    `
  }
]
