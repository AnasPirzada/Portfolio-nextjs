import { BLOGS, METADATA } from '../constants';

function generateRSSFeed(selfUrl = null) {
  // Remove trailing slash from siteUrl if present to avoid double slashes
  const baseUrl = METADATA.siteUrl.replace(/\/$/, '');

  // Use provided selfUrl or default to baseUrl/rss.xml
  const rssSelfUrl = selfUrl || `${baseUrl}/rss.xml`;

  // Sort blogs by date (newest first)
  const sortedBlogs = [...BLOGS].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const items = sortedBlogs
    .map(blog => {
      const blogUrl = `${baseUrl}/blog/${blog.slug}`;
      const pubDate = new Date(blog.date).toUTCString();

      // Clean HTML content for RSS (remove HTML tags, limit length)
      const cleanContent = blog.content
        .replace(/<[^>]*>/g, '')
        .replace(/&nbsp;/g, ' ')
        .trim()
        .substring(0, 500);

      return `
      <item>
        <title><![CDATA[${blog.title}]]></title>
        <link>${blogUrl}</link>
        <guid isPermaLink="true">${blogUrl}</guid>
        <description><![CDATA[${blog.description}]]></description>
        <pubDate>${pubDate}</pubDate>
        <author>anaspirzadaiub@gmail.com (${METADATA.author})</author>
        <category><![CDATA[${blog.tags?.join(', ') || 'Web Development'}]]></category>
        <content:encoded><![CDATA[${cleanContent}...]]></content:encoded>
      </item>
    `;
    })
    .join('');

  // Generate clean XML without leading/trailing whitespace
  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title><![CDATA[${METADATA.author} - Blog]]></title>
    <link>${baseUrl}/blogs</link>
    <description><![CDATA[${METADATA.description}]]></description>
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${rssSelfUrl}" rel="self" type="application/rss+xml" />
    <webMaster>anaspirzadaiub@gmail.com (${METADATA.author})</webMaster>
    <managingEditor>anaspirzadaiub@gmail.com (${METADATA.author})</managingEditor>
    <copyright>Copyright ${new Date().getFullYear()} ${METADATA.author}</copyright>
    <image>
      <url>${METADATA.image}</url>
      <title>${METADATA.author} - Blog</title>
      <link>${baseUrl}/blogs</link>
    </image>
    ${items}
  </channel>
</rss>`;

  return xmlContent;
}

function RSSFeed() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ req, res }) {
  // Get the current request URL to set proper self reference
  const protocol = req.headers['x-forwarded-proto'] || 'http';
  const host = req.headers.host;
  const currentUrl = `${protocol}://${host}/rss.xml`;

  // Generate RSS feed with current URL for self reference
  const rssFeed = generateRSSFeed(currentUrl);

  // Set proper headers for RSS feed
  res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8');
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=3600, stale-while-revalidate=86400'
  );

  // Write the feed (trim any leading whitespace to ensure XML declaration is first)
  res.write(rssFeed.trimStart());
  res.end();

  return {
    props: {},
  };
}

export default RSSFeed;
