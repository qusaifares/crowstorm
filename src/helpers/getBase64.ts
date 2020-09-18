const getBase64 = (file: File, cb: CallableFunction) => {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    cb(reader.result);
  };
  reader.onerror = (error) => {
    console.log('Error: ', error);
  };
};

export default getBase64;
