import { isAfter, parseISO } from 'date-fns';
import styled from 'styled-components';
import { Metadata } from '../components/Metadata';

export default function Home({ event }) {
  const isEventPending = event ? isAfter(parseISO(event.fields.datetime), Date.now()) : false;

  return (
    <>
      <Metadata />
      <Header>
        <HeaderLogo />
        {event && (
          <ActiveEvent>
            {event.fields.name} is {isEventPending ? 'coming soon!' : 'live NOW!'}
            
            <Anchor href="/schedule">Check out the schedule!</Anchor>
            {!isEventPending && event.fields.allow_donations && (
              <Anchor href="/donate">Donate to support {event.fields.receivername}!</Anchor>
            )}
          </ActiveEvent>
        )}
        <HeaderDescription position="left">
          Pokémon Speedrunning Diversity unites together a group of likeminded Pokémon speedrunners
          who are women, LGTBQ+, ethnic and racial minorities, and allies.
        </HeaderDescription>
        <HeaderDescription position="right">
          <div>
            Follow us on&nbsp;
            <Anchor href="https://twitter.com/psrdiversity" target="_blank" rel="noreferrer noopener">Twitter</Anchor>,
            and check out our&nbsp;
            <Anchor href="https://www.twitch.tv/team/psrdiversity" target="_blank" rel="noreferrer noopener">members</Anchor>!
          </div>
        </HeaderDescription>
        <HeaderDescription position="left">
          <div>
            If you&apos;re a Pokémon speedrunner or have an interest in starting,&nbsp;
            <Anchor href="https://forms.gle/U1Raa3HxdqTq16n59" target="_blank" rel="noreferrer noopener">
            apply to join the team today
            </Anchor>!
            </div>
        </HeaderDescription>
      </Header>
    </>
  )
}

export async function getServerSideProps(_context) {
  const allEvents = await (await fetch(`https://psrdiversity.com/tracker/api/v1/search/?type=event`)).json();
  const activeEvent = allEvents.find(item => !item.fields.locked) ?? null;

  return {
    props: {
      event: activeEvent,
    },
  }
}

const Header = styled.header`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem 2rem;
  max-width: 1200px;
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

  @media (max-width: 600px) {
    && {
      font-size: 1rem;
    }
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

const ActiveEvent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 2rem 6rem;
  font-size: 2rem;
  margin-top: 2rem; 

  & ${Anchor} {
    margin-top: 0.5rem;
  }

  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    transform: skew(-15deg);
    background-color: #fff;
    box-shadow: 0px 0px 0.75rem 0.25rem rgba(0, 0, 0, 0.1);
  }
`;