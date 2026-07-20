/*       var button = document.querySelector("button");
      button.onclick = function () {
        alert("Hello Word 2");
      }; */

/* /* alert("Bạn đã trên 18 tuổi");
confirm("Bạn đã trên 18 tuổi"); */
/* var result = prompt("Nhap n: ");
//console.log(result);
console.warn(result);
console.error(result); */

/* setInterval(function () {
  console.log("Time Vong lap");
}, 5000);

setTimeout(function () {
  console.log("Da duoc 5s");
}, 5000); */

//var fullname = "  Nguyen Van A Văn  ";
/* console.log(fullname.length); //Tra về độ dài của chuỗi
console.log(fullname.includes("Văn")); //Tìm vị trí đầu tiên của 1 chuỗi nằm trong 1 chuỗi
console.log(fullname.includes("B")); //Không tìm thấy tar về -1
console.log(fullname.includes("Văn", 13)); */
/* console.log(fullname.lastIndexOf("Văn", 15)); //Tìm vị trí cuối cùng của một chuỗi nằm trong một chuỗi */
/* console.log(fullname.slice(9)) //Cắt một chuỗi và trả về một chuỗi */
//console.log(fullname.replace("A", "Nam")); //Thay thế chuỗi, chỉ thay thế được chữ đầu tiên
//console.log(fullname.toLocaleLowerCase()); // Viết hoa toàn bộ
//console.log(fullname.toLocaleUpperCase()); //Viết thường toàn bộ
//console.log(fullname.trim()); //Chỉ cắt khoảng trắng đầu cuối
//console.log(fullname.charAt()); //Lấy kí tự đầu tiên
//console.log(fullname.charAt(3)); //Lấy kí tự thứ 3
//console.log(fullname.charAt(fullname.length -1)) //Lấy kí tự cuối cùng
/* var name1='HTML, CSS, JS'
var nam2= 'Hoa, Hòe'
console.log(name1.split())
console.log(name1.split(""))
console.log(name1.split(", "))
//console.log(name1.split(", ", 2))
//console.log(name1.pop(0))//Trả về phần tử cuối của mảng
//console.log(name1.push('Hoa'))
console.log(name1)
console.log(name1.concat(nam2)) //Thêm array
console.log(name1.slice(2)) //Cắt phần tử bắt dầu vt 2, không ảnh hưởng vt ban đầu */

/* var number = 1;
switch (number) {
  case 0:
    console.log("Đây là số 0");
    break;

  case 1:
    console.log("Đây là số 1");
  default:
    console.log("Không thỏa mãn");
    break;
}

    const numbers=[1,2,3,4,5,6,7,8,9,10]

    let sum =0
    numbers.forEach((item)=>{
      sum +=item
    })
    console.log(sum) */

const openTab = () => {
  window.open(
    "https://www.google.com/",
    "_black",
    "width=1200, height=600, left=100, top=50",
  );
};
const openTab = () => {
  tab = window.close();
};
