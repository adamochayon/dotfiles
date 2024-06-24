const COMPANY_EMAIL_DOMAIN = "company.domain"
const TEAM_EMAILS = ["TEAM_EMAILS"];
const EXEC_EMAILS = ["exec@company.domain"];

// Order is prioritized - first one to apply will count
const MAPPINGS = [
  {
    description: "One on Ones",
    color: CalendarApp.EventColor.MAUVE,
    predicate: (e) => includesAny(eTitle(e), ["1:1", "1on1", "1 on 1", "💡", "/ adam", "adam /"])
  },
  {
    description: "Commuting",
    color: CalendarApp.EventColor.PALE_RED,
    predicate: (e) => includesAny(eTitle(e), ["commute", "travel", "flight", "✈️", "train", "🚆"])
  },
  {
    description: "With Externals",
    color: CalendarApp.EventColor.GREEN,
    predicate: (e) => 
      eGuestEmails(e).some((email) => !email.toLowerCase().includes(COMPANY_EMAIL_DOMAIN))
  },
  {
    description: "Clients and Demos",
    color: CalendarApp.EventColor.GREEN,
    predicate: (e) => includesAny(eTitle(e), ["client", "demo"])
  },
  {
    description: "Team Events",
    color: CalendarApp.EventColor.PALE_GREEN,
    predicate: (e) => eTitle(e)[0] === "#" || includesAny(eGuestEmails(e), TEAM_EMAILS)
  },
  {
    description: "Important / Execs",
    color: CalendarApp.EventColor.RED,
    predicate: (e) => 
      eTitle(e)[0] === "!" 
      || includesAny(eGuestEmails(e), EXEC_EMAILS)
  },
  {
    description: "Others",
    color: CalendarApp.EventColor.GRAY,
    predicate: (e) => includesAny(eTitle(e), ["lunch", "happy hour", "game night"])
  },
];

const eTitle = (e) => e.getTitle().toLowerCase();
const eGuestEmails = (e) => e.getGuestList().map(g => g.getEmail());
const includesAny = (searchList, values) => values.some((value) => searchList.includes(value))

function ColorEvents() {
  const start = new Date();
  const end = new Date();
  end.setDate(start.getDate() + 21);
  Logger.log(start + " " + end);

  const calendars = CalendarApp.getAllOwnedCalendars();
  Logger.log("Found " + calendars.length + " calendars: " + calendars.map(c => c.getName()).join(", "));

  for (let calendar of calendars) {
    const events = calendar.getEvents(start, end);
    Logger.log("Found " + events.length + " events in " + calendar.getName() + " in range " + start + "-" + end);
    
    for (let e of events) {
      // Ignore events with existing colors to allow for manual override
      if (e.getColor().length > 0) continue;

      for (let mapping of MAPPINGS.slice().reverse()) {
        if (mapping.predicate(e)) {
          e.setColor(mapping.color);
          continue;
        }
      }
    }
  }
}
