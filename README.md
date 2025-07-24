# Hudson Valley Sound Website

A professional website for Hudson Valley Sound - Professional Audio Services for Every Occasion.

## Overview

This website provides a complete online presence for Hudson Valley Sound, featuring professional audio services for weddings, business meetings, parties, and events throughout the Hudson Valley region.

## Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Professional Branding**: Hudson Valley-inspired color palette with modern typography
- **Contact Form**: Comprehensive inquiry form with validation
- **Pricing Transparency**: Clear pricing table with service packages
- **Mobile Navigation**: Hamburger menu for mobile devices
- **Smooth Scrolling**: Enhanced user experience with smooth navigation
- **Accessibility**: Keyboard navigation support and ARIA compliance

## Project Structure

```
HV Sound/
├── index.html              # Main HTML file
├── styles.css              # CSS styles and responsive design
├── script.js               # JavaScript functionality
├── HV Sound Website Content.md          # Original content specifications
├── HV Sound Website Design Brief.md     # Design requirements
├── README.md               # This file
└── .gitignore              # Git ignore rules
```

## Technologies Used

- **HTML5**: Semantic markup for accessibility and SEO
- **CSS3**: Modern styling with CSS Grid and Flexbox
- **JavaScript (ES6+)**: Interactive functionality and form validation
- **Google Fonts**: Inter font family for professional typography

## Getting Started

1. Clone or download this repository
2. Open `index.html` in a web browser
3. For development, use a local server (e.g., Python's `python -m http.server` or Node's `npx serve`)

## Customization

### Colors
The website uses CSS custom properties (variables) for easy color customization. Edit the `:root` section in `styles.css`:

```css
:root {
    --primary-color: #2D5A3D;
    --secondary-color: #6B9080;
    --accent-color: #A4C3A2;
    /* ... more variables */
}
```

### Content
- Update contact information in `index.html`
- Modify service descriptions and pricing in the respective sections
- Add real photos by replacing placeholder content

### Form Integration
To make the contact form functional:
1. Set up a form handling service (Formspree, Netlify Forms, etc.)
2. Update the form action in `index.html`
3. Modify the JavaScript form submission in `script.js`

## Deployment

This static website can be deployed to:
- **Netlify**: Drag and drop deployment with form handling
- **Vercel**: Git-based deployment with automatic builds
- **GitHub Pages**: Free hosting for static sites
- **Traditional Web Hosting**: Upload files via FTP

## Performance Features

- Optimized CSS with minimal dependencies
- Efficient JavaScript with event delegation
- Responsive images and mobile-first approach
- Semantic HTML for SEO optimization

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

- [ ] Add image gallery for past events
- [ ] Integrate testimonials section
- [ ] Add blog/news section
- [ ] Implement contact form backend
- [ ] Add Google Analytics
- [ ] Optimize for local SEO
- [ ] Add social media integration

## Contact

For questions about this website implementation, please refer to the contact form on the website or the original project specifications.

## License

This project is created for Hudson Valley Sound. All rights reserved.
