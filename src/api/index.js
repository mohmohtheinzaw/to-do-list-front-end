import Promise from "core-js-pure/features/promise";

const getAllTasks = function () {
  return new Promise((rsolve, reject) => {
    let options = {
      method: "GET",
    };
    fetch("http://localhost:3000/tasks/", options)
      .then((response) => {
        // Checking errors
        console.log("Response : ", response);
        if (response.status !== 200) {
          reject();
        } else {
          return response.json();
        }
      })
      .then((result) => {
        // Gettng datas
        console.log("Result : ", result);
        rsolve(result);
      })
      .catch((err) => {
        // Request error
        reject(err);
      });
  });
};

const addTask = function (task) {
  return new Promise((rsolve, reject) => {
    let options = {
      method: "POST",
      body: task,
    };
    fetch("http://localhost:3000/tasks", options)
      .then((response) => {
        // Checking errors
        console.log("Response : ", response);
        if (response.status !== 200) {
          reject();
        } else {
          return response.json();
        }
      })
      .then((result) => {
        // Gettng datas
        console.log("Result : ", result);
        rsolve(result);
      })
      .catch((err) => {
        // Request error
        reject(err);
      });
  });
};

export { getAllTasks, addTask };
