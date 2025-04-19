function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (singleChar) => {
    const randomNumber = Math.floor(Math.random() * 16);
    return (singleChar === 'x' ? randomNumber: (randomNumber & 0x3 | 0x8)).toString(16); 
  });
}

export default generateUUID;