"use strict";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const CalculateDueDate = (submitDate, turnaroundTime) => {
  let [submitTime, submitDay] = submitDate.split(" ");
  let dayIndex = days.indexOf(submitDay);
  let [submitHour, submitMinute] = submitTime.split(":");
  let [turnaroundHourString, turnaroundMinuteString] =
    turnaroundTime.split(":");

  submitHour = parseInt(submitHour);
  submitMinute = parseInt(submitMinute);
  submitDay = parseInt(submitDay);
  let turnaroundHour = parseInt(turnaroundHourString);
  let turnaroundMinute = parseInt(turnaroundMinuteString);

  let totalTurnaroundMinutes = turnaroundHour * 60 + turnaroundMinute;

  for (
    totalTurnaroundMinutes;
    totalTurnaroundMinutes > 0;
    totalTurnaroundMinutes--
  ) {
    submitMinute++;
    if (submitMinute === 60) {
      submitMinute = 0;
      submitHour++;
      if (submitHour === 17) {
        dayIndex++;
        if (dayIndex === days.length) dayIndex = 0;
        submitHour = 9;
      }
    }
  }

  let expectedTurnaroundDate = `${submitHour
    .toString()
    .padStart(2, "0")}:${submitMinute.toString().padStart(2, "0")} on ${
    days[dayIndex]
  }`;
  return expectedTurnaroundDate;
};
///Tests
console.log(
  CalculateDueDate("10:00 Tuesday", "40:00"),
  "|||",
  "expected: 10:00 on Tuesday"
);
console.log(
  CalculateDueDate("16:12 Tuesday", "2:00"),
  "|||",
  "expected: 10:12 on Wednesday"
);
console.log(
  CalculateDueDate("9:12 Tuesday", "16:00"),
  "|||",
  "expected: 09:12 on Thursday"
);
console.log(
  CalculateDueDate("16:12 Tuesday", "0"),
  "|||",
  "expected: 16:12 on Tuesday"
);
console.log(
  CalculateDueDate("16:12 Friday", "1:00"),
  "|||",
  "expected: 09:12 on Monday"
);
