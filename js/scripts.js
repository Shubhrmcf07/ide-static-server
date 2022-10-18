let value;
let mode;
let xe;

let q = document.getElementById("language").value;
if (q == "c") {
  value =
    '#include<stdio.h>\nint main(){\nprintf("Hello World");\nreturn 0;\n}';
  mode = "text/x-csrc";
}

if (q == "cpp") {
  value =
    '#include<iostream> \nusing namespace std;\nint main(){\ncout<<"Hello World";\n}';
  mode = "text/x-c++src";
}

if (q == "python") {
  value = 'print("Hello World")';
  mode = "python";
}

xe = CodeMirror(document.querySelector("#container"), {
  lineNumbers: true,
  tabSize: 2,
  value: value,
  mode: mode,
  autoCloseBrackets: true,
  matchBrackets: true,
});

xe.setSize("100%", "100%");
let lang = document.getElementById("language");
lang.addEventListener("change", (e) => {
  let k = e.target.value;
  if (k == "cpp") {
    xe.setOption(
      "value",
      '#include<iostream> \nusing namespace std;\nint main(){\ncout<<"Hello World";\n}'
    );
    xe.setOption("mode", "text/x-c++src");
  }
  if (k == "python") {
    xe.setOption("value", 'print("Hello World")');
    xe.setOption("mode", "python");
  }

  if (k == "c") {
    xe.setOption(
      "value",
      '#include<stdio.h>\nint main(){\nprintf("Hello World");\nreturn 0;\n}'
    );

    xe.setOption("mode", "text/x-csrc");
  }
});

let form = document.getElementById("mybutton");
form.addEventListener("click", (e) => {
  e.preventDefault();
  let code = xe.getValue();
  let language = document.getElementById("language").value;
  let input = document.getElementById("input").value;
  const url = "http://localhost:8080/compile";
  return fetch(url, {
    method: "POST",
    body: JSON.stringify({
      code: code.replace(/\\\n/g, ""),
      language: language,
      input: input,
    }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Access-Control-Allow-Methods, Access-Control-Allow-Origin, Origin, Accept, Content-Type",
    },
  })
    .then((result) => {
      return result.json();
    })
    .then((data) => {
      document.getElementById("soln").innerHTML = data.output;
    })
    .catch((err) => alert(err));
});
