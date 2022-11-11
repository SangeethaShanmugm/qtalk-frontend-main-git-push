import { Key } from '@mui/icons-material';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AxioInstance from '../../services/AxioInstance';
import Styles from "./Batch.module.css"

const SelectedBatchList = () => {
    let {batchCode} = useParams();
    let [oneBatchList,setOneBatchList] = useState([]);


    useEffect(()=>{
        async function fetchlist(){
           AxioInstance.get(`admin/batchList/${batchCode}`).then((data)=>{let payload =data.data.batchData;
           
           setOneBatchList(payload)})
        }
        fetchlist()
    },[])
  return (
    <div className={Styles.SelectedBatchList}>
                <h1>Chat</h1>
                {oneBatchList?oneBatchList.map((ele,ind)=>{
                    return(
                        <>
                       <div className={Styles.BatchContainer}>
                       <aside>
                          <div>
                             <h1>{ele.batchCode}</h1>
                          </div>
                        
                        </aside>
                        <aside>
                          <div>
                             <h1>{ele.trainer}</h1>
                          </div>
                         <div>
                            <input type="search"  placeholder='Search Chat'/>
                         </div>
                        
                        </aside>
                        <aside>
                        <div>
                           <h1>{ele.addStudents
                    //   .filter(data => {
                    //     if (
                    //       data.username
                    //         .toLowerCase()
                    //         .includes(searchStud.toLocaleLowerCase())
                    //     ) {
                    //       return data;
                    //     }
                    //   })
                      .map(x => {
                        return (
                          <>
                            <div>
                              
                              <aside>
                                <h4>{x.username}</h4>
                              </aside>
                            </div>
                          </>
                        );
                      })}</h1>
                         </div>
                        </aside>
                          
                       </div>


                        
                        </>
                    )
                })
                :""}
       
        
        <aside>
            <h1>Chat Block</h1>
        </aside>
    </div>
  )
}

export default SelectedBatchList