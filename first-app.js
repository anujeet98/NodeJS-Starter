// 
console.log('a');
console.log('b');
new Promise((resolve,reject) => {
	setTimeout(() => {
		console.log('c');
		resolve();
	}, 3000);
}).then(()=>{
    return new Promise((resolve,reject) =>{
        setTimeout(()=>{
            console.log('d');
            resolve();
        },0);
    })
}).then(()=>{console.log('e')});


// console.log('a');

// console.log('b');

// setTimeout(() => console.log('c'), 3000)

// console.log('d');


// console.log('a');
// console.log('b');

// let fun = async () => {
//     await new Promise((resolve,reject) => setTimeout(() => {
//         console.log('c'); 
//         resolve()
//     }, 3000));
//     await new Promise((resolve,reject) => setTimeout(()=> {
//         console.log('d');
//         resolve();
//     }, 0));
//     console.log('e');
// }

// fun();


// console.log('a');
// console.log('b');

// let funC = (letterToPrint) => {
//     return new Promise((resolve,reject) => {
//         setTimeout(() => {
//             console.log(letterToPrint);
//             resolve();
//         }, 3000);
//     })
// };

// let funD = new Promise((resolve,reject) => {
//                 setTimeout(() => {
//                     console.log("hello");
//                     resolve();
//                 }, 0);
//             });

// funC('c').then(funD).then(console.log('e'));