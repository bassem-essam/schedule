let courses = [
  "Embedded System",
  "Natural Language Processing",
  "Concepts of Programming Languages",
  "Computer and Network Security",
  "Data Communication",
  "Computer Vision",
  "Pattern Recognition/Machine Learning",
  "Software Engineering",
  "Analysis and Design of Algorithms",
  "Digital Multimedia",
  "Data Security",
  "High Performance Computing",
  "Computer Graphics",
  "Data Analytics",
];

let sections = {};
let lectures = {};
courses.forEach((i) => {
  sections[i] = "normal";
  lectures[i] = "normal";
});

sections["Concepts of Programming Languages"] = "hands-on";
sections["Analysis and Design of Algorithms"] = "over";
sections["Data ٍSecurity"] = "over";
sections["High Performance Computing"] = "over";
sections["Natural Language Processing"] = "over";

lectures["Digital Multimedia"] = "over";
lectures["Analysis and Design of Algorithms"] = "online";
lectures["Data Analytics"] = "important";

export const messages = { over: "خلاص مفيش", "hands-on": "hands-on", normal: "", important: "مهمة", online: "Online"};

export const importance = { true: sections, false: lectures };
