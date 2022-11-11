import { fileAxios } from "./AxioInstance";


const CreateBatch = async (batchData , token) => {
  console.log(token)
  console.log(batchData)
  const { data } = await fileAxios.post("/admin/createbatch", batchData);
  console.log(data)
  fileAxios.interceptors.request.use(res => {
    res.headers = {
      Authorization: `Bearer ${token}`,
    };
  return data;
})
};

  const AddBatchService = {
    CreateBatch
  };


  
export default AddBatchService;
  