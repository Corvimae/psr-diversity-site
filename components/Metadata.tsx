import Head from 'next/head';

interface MetadataProps {
  title?: string;
  description?: string;
}

const DEFAULT_TITLE = 'Welcome to PSR Diversity';
const DEFAULT_DESCRIPTION = 'Uniting together a group of likeminded Pokemon Speedrunners who are women, LGTBQ+, ethnic and racial minorities, or allies!';
export const Metadata: React.FC<MetadataProps> = ({ title, description }) => {
  const activeTitle = title ?? DEFAULT_TITLE;
  const activeDescription = description ?? DEFAULT_DESCRIPTION;

  return (
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />

      <title>{activeTitle ? `${activeTitle} - PSR Diversity` : 'PSR Diversity'}</title>

      <meta name="description" content={activeDescription} />
      <meta name="abstract"    content={activeDescription} />
      <meta name="rating"      content="General" />

      <meta property="og:image"            content="https://psrdiversity.com/images/logo.png" />
      <meta property="og:site_name"        content="PSR Diversity" />
      <meta property="og:title"            content={activeTitle} />
      <meta property="og:description"      content={activeDescription} />
      <meta property="og:type"             content="blog" />
      <meta property="og:url"              content="https://psrdiversity.com/" />
      <meta property="og:locale"           content="en_US" />

      <meta name="twitter:site" content="@psrdiversity" />
      <meta name="twitter:url" content="https://psrdiversity.com/" />
      <meta name="twitter:title" content={activeTitle} />
      <meta name="twitter:description" content={activeDescription}/>
      <meta name="twitter:image" content="https://psrdiversity.com/images/logo.png" />
      
      <link rel="icon" href="favicon.png" />
    </Head>
  );
}
