var side = document.querySelector(".side");

var container = document.getElementById("bar");

var clsBtn = document.createElement("div");
clsBtn.classList.add("close");

var main = document.createElement("div");

main.classList.add("side-box");
var dataBox = document.createElement("div");
var tot = document.createElement("div");

var coursesList = [];
var total = 0;

function addCourse(newCourse) {
  (event) => {
    event.preventDefault();
  };

  side.style.width = "80%";
  let duplicate = coursesList.find(
    (course) => course.course === newCourse.course
  );
  if (!duplicate) {
    coursesList.push(newCourse);

    clsBtn.innerHTML = `<button onclick="exit()" id="cls-btn"> X </button>`;
    container.style.display = "block";

    dataBox.classList.add("data-box");

    tot.classList.add("total");
    container.appendChild(clsBtn);

    container.appendChild(main);
    main.innerHTML = `<h2>Course Details.</h2>
                        <div class="heading">
                            <h3>Course Name</h3>
                            <h3>Amonunt</h3>
                        </div>`;

    main.appendChild(dataBox);

    displayCourse();
  } else {
    alert(`' ${newCourse.course} ' is Already exist.`);
  }
}
function displayCourse() {
  var data = document.createElement("div");
  data.classList.add("data");

  coursesList.forEach((obj) => {
    data.innerHTML = `<h5>${obj.course}</h5>
        <h5>${obj.price}</h5>`;

    dataBox.appendChild(data);

    calcTotal();
  });
}
function calcTotal() {
  total = 0;
  coursesList.forEach((obj) => {
    total += obj.price;
  });

  tot.innerHTML = `<h5>Total</h5>
             <h5>Rs. ${total}</h5>`;
  main.appendChild(tot);
}

function removeCourse(course) {
  (event) => {
    event.preventDefault();
  };

  const index = indexOfObject(coursesList, "course", course);

  if (index > -1) {
    coursesList.splice(index, 1);

    if (coursesList.length == 0) {
      while (dataBox.lastChild) {
        dataBox.removeChild(dataBox.lastChild);
      }
      coursesList = [];
      container.style.display = "none";
      side.style.width = "100%";
    } else {
      var removeElements = document.querySelectorAll(".data");
      if (removeElements.length > 0) {
        indexToRemove = index;
        if (indexToRemove >= 0 && indexToRemove < removeElements.length) {
          removeEle = removeElements[indexToRemove];
          removeEle.parentNode.removeChild(removeEle);
        }
      }
      calcTotal();
    }
  }
}

function exit() {
  while (dataBox.lastChild) {
    dataBox.removeChild(dataBox.lastChild);
  }
  coursesList = [];
  container.style.display = "none";

  side.style.width = "100%";
}

function indexOfObject(array, property, value) {
  for (let i = 0; i < array.length; i++) {
    if (array[i][property] === value) {
      return i;
    }
  }
  return -1;
}
