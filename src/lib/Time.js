export default function Time() {
  const date = new Date();

  const month = date.getMonth();
  const day = date.getDay();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  // console.log(second);

  let monthName;
  let dayName;
  let hourName;
  let meridiem;
  let time;

  if (month === 0) {
    monthName = "JAN";
  } else if (month === 1) {
    monthName = "FEB";
  } else if (month === 2) {
    monthName = "MAR";
  } else if (month === 3) {
    monthName = "APR";
  } else if (month === 4) {
    monthName = "MAY";
  } else if (month === 5) {
    monthName = "JUN";
  } else if (month === 6) {
    monthName = "JUL";
  } else if (month === 7) {
    monthName = "AUG";
  } else if (month === 8) {
    monthName = "SEP";
  } else if (month === 9) {
    monthName = "OCT";
  } else if (month === 10) {
    monthName = "NOV";
  } else if (month === 11) {
    monthName = "DEC";
  }

  if (day === 0) {
    dayName = "SUN";
  } else if (day === 1) {
    dayName = "MON";
  } else if (day === 2) {
    dayName = "TUE";
  } else if (day === 3) {
    dayName = "WED";
  } else if (day === 4) {
    dayName = "THR";
  } else if (day === 5) {
    dayName = "FRI";
  } else if (day === 6) {
    dayName = "SAT";
  }

  if (hour === 0) {
    hourName = "12";
    meridiem = "AM";
  } else if (hour === 1) {
    hourName = "01";
    meridiem = "AM";
  } else if (hour === 2) {
    hourName = "02";
    meridiem = "AM";
  } else if (hour === 3) {
    hourName = "03";
    meridiem = "AM";
  } else if (hour === 4) {
    hourName = "04";
    meridiem = "AM";
  } else if (hour === 5) {
    hourName = "05";
    meridiem = "AM";
  } else if (hour === 6) {
    hourName = "06";
    meridiem = "AM";
  } else if (hour === 7) {
    hourName = "07";
    meridiem = "AM";
  } else if (hour === 8) {
    hourName = "08";
    meridiem = "AM";
  } else if (hour === 9) {
    hourName = "09";
    meridiem = "AM";
  } else if (hour === 10) {
    hourName = "10";
    meridiem = "AM";
  } else if (hour === 11) {
    hourName = "11";
    meridiem = "AM";
  } else if (hour === 12) {
    hourName = "12";
    meridiem = "PM";
  } else if (hour === 13) {
    hourName = "01";
    meridiem = "PM";
  } else if (hour === 14) {
    hourName = "02";
    meridiem = "PM";
  } else if (hour === 15) {
    hourName = "03";
    meridiem = "PM";
  } else if (hour === 16) {
    hourName = "04";
    meridiem = "PM";
  } else if (hour === 17) {
    hourName = "05";
    meridiem = "PM";
  } else if (hour === 18) {
    hourName = "06";
    meridiem = "PM";
  } else if (hour === 19) {
    hourName = "07";
    meridiem = "PM";
  } else if (hour === 20) {
    hourName = "08";
    meridiem = "PM";
  } else if (hour === 21) {
    hourName = "09";
    meridiem = "PM";
  } else if (hour === 22) {
    hourName = "10";
    meridiem = "PM";
  } else if (hour === 23) {
    hourName = "11";
    meridiem = "PM";
  }

   time = `${monthName} ${dayName} ${hourName} : ${minute
    .toString()
    .padStart(2, "0")} : ${second.toString().padStart(2, "0")} ${meridiem}`;

    return {time}
}
