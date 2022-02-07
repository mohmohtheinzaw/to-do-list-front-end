import Promise from "core-js-pure/features/promise";

const getAllTasks = function () {
  return new Promise((rsolve, reject) => {
    let options = {
      method: "GET",
    };
    fetch("http://localhost:3000/tasks/", options)
      .then((response) => {
        // Checking errors
        if (response.status !== 200) {
          reject();
        } else {
          return response.json();
        }
      })
      .then((result) => {
        // Gettng datas
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
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    let options = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(task),
    };
    fetch("http://localhost:3000/tasks/", options)
      .then((response) => {
        // Checking errors
        if (response.status !== 200) {
          reject();
        } else {
          return response.json();
        }
      })
      .then((result) => {
        // Gettng datas
        rsolve(result);
      })
      .catch((err) => {
        // Request error
        reject(err);
      });
  });
};

const changeStatus = function (taskId, done) {
  return new Promise((rsolve, reject) => {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    let options = {
      method: "PATCH",
      headers: headers,
    };
    fetch(
      "http://localhost:3000/tasks/change-status/" + taskId + "/" + done,
      options
    )
      .then((response) => {
        // Checking errors
        if (response.status !== 200) {
          reject();
        } else {
          return response.json();
        }
      })
      .then((result) => {
        // Gettng datas
        rsolve(result);
      })
      .catch((err) => {
        // Request error
        reject(err);
      });
  });
};

export { getAllTasks, addTask, changeStatus };
