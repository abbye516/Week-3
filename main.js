                                    ////////Inheritance/////


class Person {
    constructor(name, startYear) {
        this.name = name
        this.startYear = startYear
        this.courses = []
    }

    addCourse(course) {
        this.courses.push(course)
    }
}
class Student extends Person {
    constructor(name, startYear) {
        super(name, startYear)
        this.grades = []
    }

    receiveGrade(courseName, finalGrade) {
        this.grades.push({
            course: courseName,
            grade: finalGrade
        })
    }
}
class Teacher extends Person{
    constructor(name, startYear, salary){
        super(name, startYear)
        this.salary = salary
        this.courses = {} //overriding courses--> making it an object(was an array)
    }
    // addCourse(course) {
    //     if(this.courses[course]){
    //         return this.courses[course]++
    //     }
    //     this.courses[course] = 1
    // }
    giveGrade(student, courseName, grade){
        student.receiveGrade(courseName,grade)
    }
   
}
// class ClassRoom {
//     constructor(teacher, student) {
//         this.teacher = teacher;
//         this.student = student
//     }
//     takeTest() {
//         this.teacher.giveGrade()
//         this.student.receiveGrade()
//     }
// }
//example of dependency
////EX: 1

class Principal extends Person{
    constructor(name, startYear){
        super(null, startYear)
        this.name = "Principal " + name
        this.teachers = []
        this.students = []
    }
    hireTeacher(teacher){
        this.teachers.push(teacher)
        console.log(`${this.name} just hired ${teacher.name}`)
    }
    recruitStudent(student){
        this.students.push(student)

    }
    expelStudent(student){
        let expulledStudent = this.students.find(s => s.name === student.name)
        let index = this.students.indexOf(expulledStudent)
        if(index !== -1) {
            return this.students.splice(index, 1)
        }
    }
    transferStudent(student, principal){
        principal.students.push(...this.expelStudent(student))
        // console.log(this.expelStudent(student))
}
}

const p1 = new Principal("Martin", 1991)
const p2 = new Principal("Martha", 1990)

const t1 = new Teacher("Cassandra", 2002, 40000)
const t2 = new Teacher("Kevin", 2006, 30000)

const s0 = new Student("LuShawnda", 2002)
const s1 = new Student("Ronda", 2017)
const s2 = new Student("Byron", 2016)


//1 & 2
p1.hireTeacher(t1) //should print "Martin just hired Cassandra"
console.log(p1.teachers) //should print Array(1) [Teacher] - the teacher should be Cassandra
p1.hireTeacher(t2) //should print "Martin just hired Kevin"
console.log(p1.teachers) //should print Array(2) [Teacher, Teacher]
p1.recruitStudent(s0)
p1.recruitStudent(s1)
p1.recruitStudent(s2)

console.log(p1.students)
p1.expelStudent(s1)
console.log(p1.students) //should print Array(1) [Student] - the student should be Byron
p1.transferStudent(s2, p2)
console.log(p1.students) //should print Array(0) []
console.log(p2.students) //should print Array(1) [Student] - the student should be Byron

// let elevation = new ClassRoom(t1, s1)