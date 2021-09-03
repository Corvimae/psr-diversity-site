import Head from 'next/head';
import styled from 'styled-components';

export default function Home() {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />

        <title>PSR Diversity</title>

        <meta name="description" content="Uniting together a group of likeminded Pokemon Speedrunners who are women, LGTBQ+, ethnic and racial minorities, or allies!" />
        <meta name="abstract"    content="Uniting together a group of likeminded Pokemon Speedrunners who are women, LGTBQ+, ethnic and racial minorities, or allies!" />
        <meta name="rating"      content="General" />

        <meta property="og:image"            content="https://psrdiversity.com/images/logo.png" />
        <meta property="og:site_name"        content="PSR Diversity" />
        <meta property="og:title"            content="Welcome to PSR Diversity" />
        <meta property="og:description"      content="Uniting together a group of likeminded Pokemon Speedrunners who are women, LGTBQ+, ethnic and racial minorities, or allies!" />
        <meta property="og:type"             content="blog" />
        <meta property="og:url"              content="https://psrdiversity.com/" />
        <meta property="og:locale"           content="en_US" />

        <meta name="twitter:site" content="@psrdiversity" />
        <meta name="twitter:url" content="https://psrdiversity.com/" />
        <meta name="twitter:title" content="Welcome to PSR Diversity" />
        <meta name="twitter:description" content="Uniting together a group of likeminded Pokemon Speedrunners who are women, LGTBQ+, ethnic and racial minorities, or allies!" />
        <meta name="twitter:image" content="https://psrdiversity.com/images/logo.png" />
        
        <link rel="icon" href="favicon.png" />
      </Head>
      <Header>
        <HeaderLogo />
        <HeaderDescription position="left">
          Pokémon Speedrunning Diversity unites together a group of likeminded Pokémon speedrunners
          who are women, LGTBQ+, ethnic and racial minorities, and allies.
        </HeaderDescription>
        <HeaderDescription position="right">
          Follow us on&nbsp;
          <Anchor href="https://twitter.com/psrdiversity" target="_blank" rel="noreferrer noopener">Twitter</Anchor>,
          and check out our&nbsp;
          <Anchor href="https://www.twitch.tv/team/psrdiversity" target="_blank" rel="noreferrer noopener">members</Anchor>!
        </HeaderDescription>
      </Header>
    </>
  )
}

const Header = styled.header`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem 0;
  max-width: 1200px;
  padding: 0 2rem;
`;

const HeaderLogo = styled.div`
  width: 300px;
  height: 300px;
  background-image: url("/images/logo.png");
  background-size: contain;
`;

const MessageBubble = styled.div<{ position: string }>`
  display: flex;
  height: max-content;
  flex-direction: row;
  line-height: normal;
  align-items: center;
  padding: 1rem;
  border-radius: 1000px;
  background-color: #fff;
  text-align: left;
  box-shadow: 0px 0px 0.75rem 0.25rem rgba(0, 0, 0, 0.1);

  @media (min-width: 900px) {
    align-self: ${({ position }) => position === 'right' ? 'flex-end' : 'flex-start'};
  }
`;

const HeaderDescription = styled(MessageBubble)`
  max-width: 800px;
  font-size: 1.75rem;
  font-style: italic;
  padding: 2rem 4rem;
  margin-top: 2rem; 
`;

const Anchor = styled.a`
  color: #5883c4;
  text-decoration: none;

  &:hover {
    color: #85abe4;
  }
`
