export default async function ftob(fileUpload: any) {
  try {
    const b64 = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(fileUpload.upload[0].file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

    return b64;
  } catch (error) {
    console.error(error);
  }
}
