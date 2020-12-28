// const fs = require('fs');

// export class FileService {
//     write(name) {
//         return new Promise((resolve, rej) => {
//             fs.writeFile(name, '{"status": "success"}', (err) => {
//                 console.log('tutaj jestem przed resolved')
//                 // wysyla maila
//                 resolve();
//             });
//         });
//     }

//     read(name){
//         return fs.readFile(name)
//     }
// }

// export class DupaService {
//     write(name) {
//         return new Promise((resolve, rej) => {
//             fs.writeFile(name, '{"status": "success"}', (err) => {
//                 console.log('tutaj jestem przed resolved')
//                 // wysyla maila
//                 resolve();
//             });
//         });
//     }

//     read(name){
//         return fs.readFile(name);
//     }
// }

// const asd = new DupaService()
// asd.write();

// const fileS = new FileService();
// files.write();