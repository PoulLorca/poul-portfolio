# Poul's Portfolio

A modern, responsive portfolio website built with **Astro** and **Vue.js**, showcasing my projects, blog posts, and professional experience as a Software Engineer.

## 🌟 Inspiration

This portfolio is inspired by the beautiful design of [NeonMint](https://neonmint.efeele.dev/) by efeele, adapted with my own personal touch and content.

## 🚀 Features

- **Modern Tech Stack**: Built with Astro + Vue.js for optimal performance
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark/Light Theme**: Toggle between themes with system preference detection
- **Blog System**: Markdown-based blog with tags and technology filtering
- **Project Showcase**: Interactive project gallery with hover effects
- **Professional Timeline**: Work experience with elegant timeline design
- **Tech Stack Display**: Visual representation of technologies I work with
- **Contact Integration**: Direct email contact and social media links

## 🛠️ Tech Stack

- **Framework**: [Astro](https://astro.build/) + [Vue.js](https://vuejs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) for Vue
- **Icons**: [Lucide Vue Next](https://lucide.dev/)
- **Typography**: Roboto Mono Variable
- **Deployment**: [Vercel](https://vercel.com/)

## 📁 Project Structure

```
src/
├── components/         # Vue components
│   ├── Blog/           # Blog-related components
│   └── ui/             # Reusable UI components
├── layouts/            # Astro layouts
├── pages/              # Astro pages and routing
│   ├── posts/          # Blog posts in Markdown
│   └── blog/           # Blog navigation pages
├── styles/             # Global CSS and Tailwind config
└── lib/                # Utility functions
```

## 🏃‍♂️ Quick Start

1. **Clone the repository**
   ```sh
   git clone https://github.com/PoulLorca/poul-portfolio.git
   cd poul-portfolio
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Start development server**
   ```sh
   npm run dev
   ```

4. **Build for production**
   ```sh
   npm run build
   ```

5. **Preview production build**
   ```sh
   npm run preview
   ```

## 📝 Blog System

The blog system uses Markdown files with frontmatter for metadata:

```markdown
---
title: "Your Post Title"
date: May, 24 2025
image: "/blogs/your-image.png"
link: "/posts/your-post-slug"
techStack: ["Vue.js", "Astro"]
tags: ["Development", "Tutorial"]
layout: "@/layouts/post.astro"
---

# Your content here
```

### Adding a New Blog Post

1. Create a new `.md` file in `src/pages/posts/`
2. Add the frontmatter with required fields
3. Write your content in Markdown
4. The post will automatically appear in the blog listing

## 🎨 Customization

### Theme Colors

Colors are defined in [`src/styles/global.css`](src/styles/global.css) using CSS custom properties:

```css
:root {
  --primary: oklch(0.623 0.214 259.815);
  --background: oklch(1 0 0);
  /* ... */
}
```

### Personal Information

Update personal information in these components:
- [`src/components/About.vue`](src/components/About.vue) - About section
- [`src/components/Experience.vue`](src/components/Experience.vue) - Work experience
- [`src/components/Projects.vue`](src/components/Projects.vue) - Project showcase

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run astro` - Run Astro CLI commands

### Component Architecture

- **Astro Pages**: Handle routing and static generation
- **Vue Components**: Interactive UI elements and client-side functionality
- **Shared Components**: Reusable UI components in `src/components/ui/`

## 🌐 Deployment

This project is configured for deployment on Vercel. Simply connect your GitHub repository to Vercel for automatic deployments.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/PoulLorca/poul-portfolio/issues).

## 📞 Contact

- **Email**: poullorca@proton.me
- **GitHub**: [@PoulLorca](https://github.com/PoulLorca)
- **LinkedIn**: [Poul Lorca](https://linkedin.com/in/poul-lorca-9433a8296)

---

⭐ If you found this project helpful, please consider giving it a star!
