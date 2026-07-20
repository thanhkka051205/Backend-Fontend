function palindrome(string) {
  const reverseString = string.split("").reverse().join("");
  console.log(reverseString);
  return string === reverseString;
}

console.log(palindrome("cicic"));
console.log(palindrome("solos"));
