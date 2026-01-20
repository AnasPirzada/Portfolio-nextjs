import { PROJECTS, BLOGS, METADATA } from '../constants';

function generateSiteMap() {
  const baseUrl = METADATA.siteUrl;

  // Static pages
  const staticPages = ['', '/projects', '/blogs'];

  // Dynamic project pages with lastmod dates
  const projectPages = PROJECTS.map(project => ({
    url: `/project/${project.name.toLowerCase().replace(/\s+/g, '-')}`,
    lastmod: project.year
      ? new Date(`${project.year}-12-31`).toISOString()
      : new Date().toISOString(),
  }));

  // Dynamic blog pages with lastmod dates
  const blogPages = BLOGS.map(blog => ({
    url: `/blog/${blog.slug}`,
    lastmod: blog.date
      ? new Date(blog.date).toISOString()
      : new Date().toISOString(),
  }));

  // Format static pages
  const formattedStaticPages = staticPages.map(page => ({
    url: page,
    lastmod: new Date().toISOString(),
  }));

  const allPages = [...formattedStaticPages, ...projectPages, ...blogPages];

  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     ${allPages
       .map(page => {
         const pageUrl = typeof page === 'string' ? page : page.url;
         const lastmod =
           typeof page === 'string' ? new Date().toISOString() : page.lastmod;
         return `
       <url>
           <loc>${baseUrl}${pageUrl}</loc>
           <lastmod>${lastmod}</lastmod>
           <changefreq>weekly</changefreq>
           <priority>${pageUrl === '' ? '1.0' : '0.8'}</priority>
       </url>
     `;
       })
       .join('')}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap();

  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
