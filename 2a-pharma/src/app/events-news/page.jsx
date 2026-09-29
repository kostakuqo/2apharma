import EventsNewsClient from "./EventsNewsClient.jsx";

export const metadata = {
  title: "News & Events | 2A Pharma",
  description: "The latest news and events from 2A Pharma — trade fairs, certifications and updates in medicines distribution.",
  keywords: "news, events, 2A Pharma",
  alternates: { canonical: "https://2a-pharma.al/events-news/" },
};

export default function EventsNewsPage() {
  return <EventsNewsClient />;
}