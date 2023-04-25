  /* 은영 결제창 테스트중 */
  import React, { useEffect, useState } from 'react'
  import { Link, useLocation, useParams, useSearchParams } from "react-router-dom"
  import Header from '../../components/Header'
  import Sidebar from '../../components/Sidebar'
  import { mk_boardDetailDB, mk_boardSellDB } from '../../axios/board/market/marketLogic'
  import { paymentInsert } from '../../axios/payment/paymentLogic'
  import { Cookies } from 'react-cookie'

  const cookies = new Cookies();
  const PaySucPage = () => {

    /* 결제 처리에 필요한 회원정보 */ 
    const _userData = cookies.get("_userData");
    
    let member_no;
    let member_name = '';
    let member_email = '';
    if (_userData) {
      member_no = _userData.memberNo;
      member_name = _userData.memberName;
      member_email = _userData.memberEmail;
      
    }


      let {festMId} = useParams() //라우트 파라미터로 받은 글번호
      const searchParams = new URLSearchParams(useLocation().search);
      
      const orderid = searchParams.get("orderId")
      console.log(orderid) //주문번호
      const price = Number(searchParams.get("amount")).toLocaleString()
      console.log(price) // 가격
      const no = parseInt(festMId.substring(1))
      console.log(no) //글번호

      

      //마켓 게시판 게시글일 경우 판매완료 처리 - 결제내역 추가
      useEffect(() => {
        const mkSell = async () => {
          const board = {
            boardMkNo: no,
          };
          const res = await mk_boardDetailDB(board);
          const temp = JSON.stringify(res.data);
          const jsonDoc = JSON.parse(temp);
   /*        setDetail({
            board_mk_no: jsonDoc[0].boardMkNo,
            board_mk_title: jsonDoc[0].boardMkTitle,
            mk_ticket_place: jsonDoc[0].mkTicketPlace,
            mk_ticket_date: jsonDoc[0].mkTicketDate,
            mk_ticket_count: jsonDoc[0].mkTicketCount,
            mk_ticket_price: jsonDoc[0].mkTicketPrice,
          }); */
      
          const sellBoard = {
            boardMkNo: jsonDoc[0].boardMkNo,
            mkTicketPrice: jsonDoc[0].mkTicketPrice,
          };
          await mk_boardSellDB(sellBoard);
      
          const payment = {
            paymentId: 0,
            paymentOrderId: orderid,
            paymentOrderName: jsonDoc[0].boardMkTitle,
            paymentCount: jsonDoc[0].mkTicketCount,
            paymentPrice: jsonDoc[0].mkTicketPrice,
            paymentFestDate: jsonDoc[0].mkTicketDate,
            boardMkNo: jsonDoc[0].boardMkNo,
            memberNo: member_no,
            memberName: member_name,
            memberEmail: member_email,
          };
          await paymentInsert(payment);
        };
        mkSell();
      }, []);

    return (
      <>
          <Header />
              <Sidebar />
        <div className="center">

          <div className="payment_center_div" style={{margin:'100px', textAlign:'center', fontWeight:'bold'}}>
          <i class="bi bi-check-circle" style={{fontSize:"10rem"}}></i>
        <h1  style={{fontWeight:'bold' , color:'rgb(30,220,20)'}}>결제가 정상적으로 처리되었습니다. </h1><br/>
        <h1  style={{fontWeight:'bold',color:'rgb(30,220,20)' ,marginBottom:'20px'}}>감사합니다!</h1><br/>
        <span> 주문 번호 : {` ${searchParams.get("orderId")}`}</span><br/>
        <div>결제 금액 : {` ${Number(searchParams.get("amount")).toLocaleString()}원`}</div><br/>
          <p> 상품 {}의 구매가 완료되었습니다. </p>
          <Link to = "/">
            <button className="homebtn" style={{backgroundColor:'rgb(80,50,200)', color:'white', borderRadius:'30px', width:'450px', height:'60px', marginTop:'10px' , fontFamily:'Nanum-Gothic', fontWeight:'bold', fontSize:'1.2rem'}}> 계속 둘러보기 </button>
            </Link>
          </div>

        </div>
      </>
    )
  }

  export default PaySucPage


