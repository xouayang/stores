import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import laoCurrency from "@lailao10x/lao-currency";
import laotime from "@lailao10x/laotime";
//import laoAddress from "@lailao10x/lao-address";
import axios from "axios";
import StatementRow from "../components/StatementRow";
import { END_POINT } from "../constants";
export const Statement = () => {
  const [order, setOrder] = useState([])
  const orderProduct = () => {
    axios({
      method:"GET",
      url:`${END_POINT}/orders?status=CART`,
      headers:{
        authorization:JSON.parse(localStorage.getItem("userToken"))
      }
    }).then((res) => {
      setOrder(res.data)
    }).catch((error) => {
      console.error(error)
    })
  }
    console.log(order)
  useEffect(() => {
    orderProduct()
  },[])
  
  // const [provinceId, setProvinceId] = useState([]);
  // const [districtList, setDistrictList] = useState([]);
  // const [districtId , setDistrictId ] = useState([]);
  // const [villageList, setVillageList] = useState([])
  // let options = {
  //   province: "all",
  //   //village:'all'
  // };
  // let provinces = laoAddress(options);
  // const onChangeProvince = (pid) => {
  //   setProvinceId(pid);
  // };
  // useEffect(() => {
  //   if (provinceId) {
  //     let options = {
  //       province: provinceId,
  //      district: "all",
  //     };
  //     let districts = laoAddress(options);
  //     setDistrictList(districts);
  //   }
  // }, [provinceId]);

  //  let option = {
  //    village:'all'
  //  }
  // const onChangeDistrict = (did) => {
  //  setDistrictId(did) 
  //  console.log(did)
  // }
  // useEffect(() => {
  //    if(districtId){
  //      let options = {
  //        district:districtId,
  //        village:'all'
  //      }
  //      let villages = laoAddress(options)
  //       setVillageList(villages)
  //       console.log(villageList)  
  //    }
  // }, [districtId]);
 
  return (
    <Container className="mt-5">
      <Row>
        {order && order?.map((data, index) => (
         <Row key={index}>
           <StatementRow orderProduct={data}/>
         </Row>
        ))}
        
        {/* <div>
          <Row className="mt-4">
            <Col md={4}  >
            <select onChange={(e) => onChangeProvince(e.target.value)} className="form-control">
            <option value={"0"}>ເລືອກເເຂວງ</option>
            {provinces.map((data, index) => {
              return <option key={index} value={data.pid}>{data.pn}</option>;
            })}
          </select>
            </Col>
            <Col md={4}>
            <select className="form-control" onChange={(e) =>onChangeDistrict(e.target.value)}>
            <option value={"0"}>ເລືອກເມືອງ</option>
            {districtList &&
              districtList.map((data, index) => {
                return <option key={index} value={data.did}>{data.dn}</option>;
              })}
          </select>
            </Col>
            <Col md={4}>
            <select className="form-control">
            <option value={"0"}>ເລືອກບ້ານ</option>
            {villageList &&
              villageList.map((data, index) => {
               return <option key={index} value={data.vid}>{data.vn}</option>;
               
              })}
          </select>
            </Col>
          </Row>       
        </div> */}
      </Row>
    </Container>
  );
};
