/* Câu 01: Viết một chương trình để lấy URL hiện tại của trang và in ra màn hình console.
var currentURL = window.location.href;
console.log(currentURL); */

/* Câu 02: Viết một chương trình để lấy phần thông tin của URL (gồm protocol, hostname và port) và in ra màn hình console 

var protocol = window.location.protocol
var hostname=window.location.hostname
var port=window.location.port

console.log("Protocol = " + protocol)
console.log("Hostname = " + hostname)
console.log("Port = " + port)*/

/* Câu 03: Viết một chương trình để chuyển hướng người dùng đến một URL khác sau một khoảng thời gian nhất định. 

function redirect(url, delay) {
  setTimeout(function () {
    window.location.href = url;
  }, delay);
}

redirect("<https://google.com>", 5000);*/

/* Câu 07: Sử dụng setTimeout để hiển thị đếm ngược. */
var seconds = 10;
function countDown() {
  if (seconds >= 0) {
    console.log(seconds);
    seconds--;
    setTimeout(countDown, 1000);
  } else {
    console.log("Happy New Year");
  }
}
