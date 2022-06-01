export const getBase64 = (file: any) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      return resolve(String(reader.result));
    };
    reader.onerror = (error) => reject(String(error));
  });
