// const convertToJpg = () => {
//   function converter(imageFileBlob, options) {
//     options = options || {};

//     const canvas = document.createElement('canvas');
//     const context = canvas.getContext('2d');
//     const imageElement = createImage();
//     const downloadLink = document.createElement('a')

//     function createImage(options) {
//       options = options || {};
//       const img = document.createElement('img');
//       img.style.width = options.width ? `${options.width}px` : 'auth';
//       img.style.height = options.height ? `${options.height}px` : 'auth';
    
//       return img;
//     }

//     function process() {
//       const imageUrl = URL.createObjectURL(imageFileBlob);
//       imageElement.addEventListener('load', e => {
//         canvas.width = e.target.width;
//         canvas.height = e.target.height;
//         context.drawImage(e.target, 0, 0, e.target.width, e.target.height);
//         canvas.toBlob(
//           updateDownloadLink
//         )
//       })
//     }
//   }
// }