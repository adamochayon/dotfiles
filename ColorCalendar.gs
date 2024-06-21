function ColorEvents() {
  var start = new Date();
  var end = new Date();
  end.setDate(start.getDate() + 21);
  Logger.log(start + " " + end);

  var calendars = CalendarApp.getAllOwnedCalendars();
  Logger.log("Found " + calendars.length + " calendars: " + calendars.map(c => c.getName()).join(", "));

  for (var i=0; i < calendars.length; i++) {
    var calendar = calendars[i];
    var events = calendar.getEvents(start, end);
    Logger.log("Found " + events.length + " events in " + calendar.getName() + " in range " + start + "-" + end);
    for (var j=0; j<events.length; j++) {
      var e = events[j];
      var guestEmails = e.getGuestList().map(g => g.getEmail());
      var title = e.getTitle().toLowerCase();
      if (["interview", "debrief"].some((name) => title.includes(name))) {
        e.setColor(CalendarApp.EventColor.PALE_RED);
      } else if (["1:1", "1on1", "1 on 1", "💡", "/ Adam", "Adam /"].some((name) => title.toLowerCase().includes(name))) {
        e.setColor(CalendarApp.EventColor.MAUVE);
      } else if (
        title[0] === "!" || (["SOME_EXEC@email.com"].some((email) => guestEmails.some(guestEmail => guestEmail.includes(email)))
        && !['EXCLUDE TITLES'].some((name) => title.toLowerCase().includes(name)))
      ) {
        e.setColor(CalendarApp.EventColor.RED);
      } else if (title[0] === '#' || guestEmails.includes('MY_TEAM')) {
        e.setColor(CalendarApp.EventColor.PALE_GREEN);
      } else if (["🌱", "GROWTH"].some((name) => title.toLowerCase().includes(name))) {
        e.setColor(CalendarApp.EventColor.GREEN);
      } else if (["lunch", "happy hour", "game night"].some((name) => title.toLowerCase().includes(name))) {
        e.setColor(CalendarApp.EventColor.GRAY);
      }
    }
  }
}
