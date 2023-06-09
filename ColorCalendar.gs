function ColorEvents() {
  var today = new Date();
  var nextTwoWeeks = new Date();
  nextTwoWeeks.setDate(today.getDate() + 14);
  Logger.log(today + " " + nextTwoWeeks);

  var calendars = CalendarApp.getAllOwnedCalendars();
  Logger.log("Found " + calendars.length + " calendars: " + calendars.map(c => c.getName()).join(", "));

  for (var i=0; i < calendars.length; i++) {
    var calendar = calendars[i];
    var events = calendar.getEvents(today, nextTwoWeeks);
    Logger.log("Found " + events.length + " events in " + calendar.getName() + " in range " + today + "-" + nextTwoWeeks);
    for (var j=0; j<events.length; j++) {
      var e = events[j];
      var guestEmails = e.getGuestList().map(g => g.getEmail());
      var title = e.getTitle().toLowerCase();
      if (["interview", "debrief"].some((name) => title.includes(name))) {
        e.setColor(CalendarApp.EventColor.PALE_RED);
      } else if (["1:1", "1on1", "1 on 1", "💡", "Adam / ", " / Adam"].some((name) => title.toLowerCase().includes(name))) {
        e.setColor(CalendarApp.EventColor.MAUVE);
      } else if (title[0] === "!" || ["<exec email>"].some((email) => guestEmails.some(guestEmail => guestEmail.includes(email)))) {
        e.setColor(CalendarApp.EventColor.RED);
      } else if (title[0] === '#' || guestEmails.includes("<team email>")) {
        e.setColor(CalendarApp.EventColor.PALE_GREEN);
      } else if (["<junk>"].some((name) => title.toLowerCase().includes(name))) {
        e.setColor(CalendarApp.EventColor.GRAY);
      }
    }
  }
}
