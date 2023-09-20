function createEmployeeRecord(arr) {
    const record = {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return record;
}

function createEmployeeRecords(employeeRecords) {
    const records = employeeRecords.map(function (record) {
        return createEmployeeRecord(record)
    })
    return records;
}

function createTimeInEvent(record, date) {
    const dates = date.split(" ")
    const timeInObj = {
        type: "TimeIn",
        hour: parseInt(dates[1]),
        date: dates[0],
    }
    record.timeInEvents.push(timeInObj)
    return record
}

function createTimeOutEvent(record, date) {
    const dates = date.split(" ");
    const timeOutObj = {
        type: "TimeOut",
        hour: parseInt(dates[1]),
        date: dates[0]
    }
    record.timeOutEvents.push(timeOutObj)
    return record;
}

function hoursWorkedOnDate(record, date) {
    const timeIn = record.timeInEvents.find(function (e) {
        return e.date === date
    }).hour
    const timeOut = record.timeOutEvents.find(function(e) {
        return e.date === date
    }).hour
    const hoursWorked = (timeOut - timeIn)/100
    return hoursWorked;
}

function wagesEarnedOnDate(record, date) {
    const employeeWage = record.payPerHour
    const hoursWorked = hoursWorkedOnDate(record, date);
    return employeeWage * hoursWorked
}

function allWagesFor(record) {
    const allWages = record.timeInEvents.map(function (day) {
        return wagesEarnedOnDate(record, day.date)
    })
    return allWages.reduce((num1, num2) => num1 + num2)
}

function calculatePayroll(records) {
    const employeesWages = records.map(function(employee) {
        return allWagesFor(employee)
    })
    return employeesWages.reduce((num1, num2) => num1 + num2)
}



// const employee1 = ["Michael", "Friedman", "Manager", 30]
// const employee2 = ["Bleak", "Chandler", "Employee", 20]
// createEmployeeRecord(employee1)


const record = {
    firstName: "Michael",
    familyName: "Friedman",
    title: "manager",
    payPerHour: 30,
    timeInEvents: [{type: 'TimeIn', hour: '1400', date: '2003-09-19'}, {type: 'TimeIn', hour: '1400', date: '2003-10-19'}],
    timeOutEvents: [{type: 'TimeOut', hour: '2200', date: '2003-09-19'}, {type: 'TimeIn', hour: '2200', date: '2003-10-19'}]
}
allWagesFor(record)
