var a = "Daca.vn - Professional Web Design Services.";

console.log(a.indexOf("Web")); // Kết quả: 23
console.log(a.indexOf("Web", 24)); // Kết quả: -1
console.log(a.indexOf("vn")); // Kết quả: 5

console.log(a.lastIndexOf("Design")); // Kết quả: 27

console.log(a.slice(10, 22)); // Kết quả: "Professional"
console.log(a.slice(-16, -10)); // Kết quả: "Design"

console.log(a.split("", 7)); // Kết quả: ['D', 'a', 'c', 'a', '.', 'v', 'n']
