import AxioInstance from "./AxioInstance";


const getBatch = async (batchData, token) => {
  AxioInstance.interceptors.request.use(res => {
    res.headers = {
      Authorization: `Bearer ${token}`,
    }
    return res;
  })
  const { data } = await AxioInstance.get("/admin/batchList", batchData);
  console.log(data)
  
}
  

const ListBatchService = {
  getBatch
};


  
export default ListBatchService;
  