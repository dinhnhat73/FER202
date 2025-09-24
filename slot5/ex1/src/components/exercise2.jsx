export function Exercise2() {
    //khai bao mang so nguyen
    const numbers = [1, -20, 13, 4, -5, 6,9 -10, 8, 7, -15];
    //tinh tong cac phan tu trong mang
    const sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    // khai báo mang chuỗi name
    const names = ["Alice", "Bob", "Charlie", "David"];
    //khai báo mảng people gồm 10 phần tử 
    const people = [
        { id: 1, name: "Alice", age: 15 },
        { id: 2, name: "Bob", age: 13 },
        { id: 3, name: "Charlie", age: 18 },
        { id: 4, name: "David", age: 17 },
        { id: 5, name: "Eve", age: 28 },
        { id: 6, name: "Frank", age: 33 },
        { id: 7, name: "Grace", age: 29 },
        { id: 8, name: "Hannah", age: 31 },
        { id: 9, name: "Ivy", age: 27 },
        { id: 10, name: "Jack", age: 34 }
    ];
    const isTeen = person => person.age >= 13 && person.age <= 19;
    const teenlist = people.filter(p => p.age >= 13 && p.age <= 19);
    console.log(teenlist);
    
    //ví dụ thêm một phần tử mới vào mảng people
    //people.push(
       

    return (
        <div>
        <h2>Bai exercise2 </h2>    
            <p>
                Cac phần tử của mảng là
            </p>
            <ul></ul>
                {numbers.map((number, index) => (
                    <li key={index}>{number}</li>
                ))}
            <ul></ul>
            <p> Tổng các phần tử của mảng là <strong> {sum}</strong></p>
            <p> số lương phần tử là : {numbers.length}</p>
            <p> Hiển thị danh sách tên tăng dần </p>
            <ul>
                {names.sort().map((name, index) => (
                    <li key={index}>{name}</li>
                ))}
            </ul>
            <p> Danh sách tuổi teen </p>
            <ul>
                {teenlist.map((person) => (<li key={person.id}>{person.name} - {person.age} </li>))}
            </ul>
        </div>
    );
}