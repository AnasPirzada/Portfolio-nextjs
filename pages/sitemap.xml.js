import { PROJECTS, BLOGS, METADATA } from '../constants';

function generateSiteMap() {
  const baseUrl = METADATA.siteUrl;
  
  // Static pages
  const staticPages = [
    '',
    '/projects',
    '/blogs',
  ];

  // Dynamic project pages
  const projectPages = PROJECTS.map(project => 
    `/project/${project.name.toLowerCase().replace(/\s+/g, '-')}`
  );

  // Dynamic blog pages
  const blogPages = BLOGS.map(blog => `/blog/${blog.slug}`);

  const allPages = [...staticPages, ...projectPages, ...blogPages];

  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     ${allPages
       .map(page => {
         return `
       <url>
           <loc>${baseUrl}${page}</loc>
           <lastmod>${new Date().toISOString()}</lastmod>
           <changefreq>weekly</changefreq>
           <priority>${page === '' ? '1.0' : '0.8'}</priority>
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
