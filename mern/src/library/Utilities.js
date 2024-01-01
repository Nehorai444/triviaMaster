const getQuestions = (difficulty) => {
    return new Promise((resolve, reject) => {
        let url = "";
        switch(difficulty) {
            case "Easy":
                url =  "https://opentdb.com/api.php?amount=10&category=28&difficulty=easy&type=multiple";
                break;
            case "Medium":
                url =  "https://opentdb.com/api.php?amount=10&category=28&difficulty=medium&type=multiple";
                break;
            case "Hard":
                url =  "https://opentdb.com/api.php?amount=10&category=28&difficulty=hard&type=multiple";
                break;
            default: 
                console.error("Error while trying to get questions")
        }
        fetch(url).then(res => res.json())
        .then(data=> resolve(data))
        .catch(err => reject(err))
    })
}

const addGrade = (userName, grade) => {
    return new Promise((resolve, reject) => {
        let requestInit = {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            }, body: JSON.stringify({userName, grade})
        }
        fetch("/api/user/add/grade", requestInit).then(res => resolve(res.json()))
        .catch(err => reject(err))
    })
}

const getLastGrades = (userName) => {
    return new Promise((resolve, reject) => {
        let requestInit = {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            }, body: JSON.stringify({userName})
        }
        fetch("/api/user/grades", requestInit).then(res => resolve(res.json()))
        .catch(err => reject(err))
    })
}

const login = (userName, password) => { // Sign In
    return new Promise((resolve, reject) => {
        let requestInit = {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            }, body: JSON.stringify({userName, password})
        }
        fetch("/api/login", requestInit).then(res => resolve(res.json()))
        .catch(err => reject(err))
    })
}

const addUser = (userName, password) => { // Sign Up
    return new Promise((resolve, reject) => {
        let temp = {userName, password}
        let requestInit = {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            }, body: JSON.stringify(temp)
        }
        fetch("/api/register", requestInit).then(res => resolve(res.json()))
        .catch(err => reject(err))
    })
}


export const ApiRequests = {
    getQuestions,
    addGrade,
    getLastGrades,
    login,
    addUser
}