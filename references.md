https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from

https://developer.mozilla.org/en-US/docs/Web/API/Event/currentTarget
--> event.target vs event.currentTarget

https://www.freecodecamp.org/news/how-to-keep-your-footer-where-it-belongs-59c6aa05c59c/
--> to read and figure out later

https://youtu.be/ddVm53j80vc?si=MBAYS61_bta349Da
--> to watch later; about dynamic module imports

//import AND export btw 2 js files to access variables// importance of type = "module"
https://javascript.info/import-export
https://youtu.be/g7gmL4Fadno
https://www.youtube.com/watch?v=NSnckA3LyGw
https://youtu.be/s9kNndJLOjg?si=_O55r30f_TrVCojn

//scrambling words
https://stackoverflow.com/questions/42334640/creating-a-javascript-string-word-scrambler#:~:text=First%20you%20get%20the%20text,back%20into%20the%20text%20area.
https://www.geeksforgeeks.org/shuffle-a-given-array-using-fisher-yates-shuffle-algorithm/
https://stackabuse.com/shuffling-arrays-in-javascript/
e.g.
function fisherYatesShuffle(array) {
let currentIndex = array.length;
while (currentIndex !== 0) {
// Pick a remaining element
let randomIndex = Math.floor(Math.random() \* currentIndex);
currentIndex--;

        // And swap it with the current element
        let temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;

}

let arr = [1, 2, 3, 4, 5];
console.log(fisherYatesShuffle(arr)); // [ 3, 1, 5, 4, 2 ]

---

function durstenfeldShuffle(array) {
for (let i = array.length - 1; i > 0; i--) {
const j = Math.floor(Math.random() \* (i + 1));
[array[i], array[j]] = [array[j], array[i]];
}
return array;
}

let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(durstenfeldShuffle(arr));

//focus vs blur
https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_text_focus

//toLocaleLowerCase
https://medium.com/nerd-for-tech/basics-of-javascript-string-tolocalelowercase-method-552804b1f580
https://www.techonthenet.com/js/string_tolocalelowercase.php

//index = -1 --> element absent
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf

//filter and includes
https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
https://stackoverflow.com/questions/47785624/filter-and-includes-to-filter-array-with-array

//using spread syntax --> to ensure original array unchanged after splice
test code:
let fruits = ['apple', 'banana', 'cherry', 'date'];
fruits.splice(2, 1); //remove cherry
console.log(fruits) //array mutated

let fruits2 = ['apple', 'banana', 'cherry', 'date'];
console.log('initial ' + fruits2)
let originalFruits2 = [...fruits2];
fruits2.splice(2, 1);
console.log('mutated ' + fruits2);
console.log('remain unchanged ' + originalFruits2)
// let originalWordsArray = [...wordsArray]; //copy of wordsArray using spread syntax - unmutable //for splice

do while loop!!!!

_RETHINKING REHASHING TO ORGANIZE CODE BETTER_

1. get topic
2. shuffled array of words -- topic specific
3. jumbled letters of each word from shuffled array + associated hints to stay intact (to be displayed)
4. iterate thru shuffled array

---

Presentation - 8-Apr-24
You will have a maximum of 10 minutes to present your project following these guidelines:

Introduce the Project:
Intro your game by paraphrasing the README.
Demonstrate the Project:
Launch the game by clicking the link in the README.
Play the game! If necessary, manipulate the values of variables in the console to ensure a quick win or loss.
Show/discuss your code:
Briefly show the HTML & CSS.
Show the JavaScript and discuss your favorite function.
Share the experience:
What was your biggest challenge? debugging, breaking down the functions
What are your key learnings/takeaways? redundancy on review and facing the above challenges
Q & A + Feedback

Requirements for README
Your game's title
A description of your game. Background info of the game is a nice touch
include the link to your deployed game
Images of your actual game / gifs with User story / how to play
List of the technologies used, e.g., JavaScript, HTML, CSS, etc.
Next Steps: Planned future enhancements (icebox items)

---

FEEDBACK FROM PRESENTATION
-key idea on accounting for accessibility
-- buttons, form inputs --> can tab --> players can rely on keyboard
-- using form input attributes e.g. label (is preferred for accessibility) vs placeholder

- some articles i have found to read
  -- https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/button_role
  -- https://www.w3schools.com/html/html_accessibility.asp
  -- https://www.w3schools.com/tags/tag_fieldset.asp
  -- https://coyleandrew.medium.com/alternatives-to-placeholder-text-13f430abc56f
