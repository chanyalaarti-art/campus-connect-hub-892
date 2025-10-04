import EventsCalendar from "@/components/EventsCalendar";

const Events = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-4xl font-bold mb-2">Campus Events</h1>
        <p className="text-muted-foreground">
          Stay updated with upcoming events, festivals, and activities
        </p>
      </div>

      <EventsCalendar />
    </div>
  );
};

export default Events;
