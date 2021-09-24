let fs = require("fs");
let text = fs.readFileSync("./course_catalog.txt","utf8");
let textByLine = text.split("\n");
let re = /[A-Z]{3} \d{3}[A-Z]* \d+(-\d)? hour/
let courses = {};

let out = fs.createWriteStream('courses.txt', {
  flags: 'a' // 'a' means appending (old data will be preserved)
})

let totalCourseCount = 0;

for (let line = 0; line<textByLine.length; line++) {
    if (textByLine[line].match(re)){
        let course = {
            code : "", 
            name : "",
            hours : 0,
            description : "",
            prerequisites : [],
        };
        let lineTemp = textByLine[line++].split(" ");
        course["code"]=lineTemp[0]+" "+lineTemp[1];
        course["hours"]=lineTemp[2];
        course["name"]=textByLine[line++]
        let desc = "";
        while (!textByLine[line].match(re)&&!(textByLine[line].length<60 && textByLine[line][textByLine[line].length-1]!='.')){ //Course description and prerequisites
            desc+=textByLine[line++] + " ";
        }
        course["description"]=desc;
        let toggle = false;
        if (desc.match(/Prerequisite/)){
            let re = /[A-Z]{3} \d{3}[A-Z]*/g;
            course["prerequisites"] = desc.match(re);
        }
        if (course.code in courses){
            console.log("Duplicate issue: " + course.code);
        }
        else {
            totalCourseCount++;
        }
        courses[course.code]=course;
        // for (let word of desc.split(" ")){
        //     if (toggle){
        //         if(word[word.length-1]==="."){
        //             word=word.slice(0,-1);
        //             toggle = false;
        //         }

        //     }
        //     if (word==="Prerequisites:"||word==="Prerequisite:"){
        //         toggle = true;
        //     }
        // }
        line--;
        

    }
}
out.write(JSON.stringify(courses));
console.log("Total courses: "+ totalCourseCount )
// console.log(courses);
// for (let line = 0; line<textByLine.length; line++) {
//     if (textByLine[line].match(re)){
//         out.write(textByLine[line++]); //Course Code, x hours
//         out.write('\n');
//         out.write(textByLine[line++]+'\n'); //Course Name
//         while (!textByLine[line].match(re)&&!(textByLine[line].length<60 && textByLine[line][textByLine[line].length-1]!='.')){ //Course description and prerequisites
//             out.write(textByLine[line++] + " ");
//         }
//         out.write('\n');
//         line--;

//     }
// }

