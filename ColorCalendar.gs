function ColorEvents() {
  var start = new Date();
  var end = new Date();
  end.setDate(start.getDate() + 21);
  Logger.log(start + " " + end);

  var calendars = CalendarApp.getAllOwnedCalendars();
  Logger.log("Found " + calendars.length + " calendars: " + calendars.map(c => c.getName()).join(", "));

  var eTitle = (e) => e.getTitle().toLowerCase();
  var eGuestEmails = (e) => e.getGuestList().map(g => g.getEmail());
  var includesAny = (searchList, values) => values.some((value) => searchList.includes(value))

  // Order is prioritized - first one to apply will count
  const mappings = [
    {
      description: "One on Ones",
      color: CalendarApp.EventColor.MAUVE,
      predicate: (e) => includesAny(eTitle(e), ["1:1", "1on1", "1 on 1", "💡", "/ Adam", "Adam /"])
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
        eGuestEmails(e).some((email) => !email.toLowerCase().includes("COMPANY DOMAIN"))
    },
    {
      description: "Clients and Demos",
      color: CalendarApp.EventColor.GREEN,
      predicate: (e) => includesAny(eTitle(e), ["client", "demo"])
    },
    {
      description: "Team Events",
      color: CalendarApp.EventColor.PALE_GREEN,
      predicate: (e) => eTitle(e)[0] === "#" || includesAny(eGuestEmails(e), ["TEAM_EMAILS"])
    },
    {
      description: "Important / Execs",
      color: CalendarApp.EventColor.RED,
      predicate: (e) => 
        eTitle(e)[0] === "!" 
        || includesAny(eGuestEmails(e), ["EXEC@EMAIL.COM"])
    },
    {
      description: "Others",
      color: CalendarApp.EventColor.GRAY,
      predicate: (e) => includesAny(eTitle(e), ["lunch", "happy hour", "game night"])
    },
  ];

  for (var calendar of calendars) {
    var events = calendar.getEvents(start, end);
    Logger.log("Found " + events.length + " events in " + calendar.getName() + " in range " + start + "-" + end);

    for (var e of events) {
      if (e.getColor().length > 0) {
        // Ignore events with existing colors to allow for manual override
        continue;
      }

      for (var mapping of mappings.slice().reverse()) {
        if (mapping.predicate(e)) {
          e.setColor(mapping.color);
          continue;
        }
      }
    }
  }
}
