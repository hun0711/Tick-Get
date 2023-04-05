import React, { useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BButton,
  ContainerDiv,
  FormDiv,
  HeaderDiv,
  MyButton,
  MyH1,
  MyInput,
  MyLabel,
  MyLabelAb,
  PwEye,
  SignupForm,
  SubmitButton,
} from "../../styles/formStyle";
import QuillEditor from "./QuillEditor";
import {
  mk_boardInsertDB,
  uploadFileDB,
} from "../../axios/market/marketLogic";
import {
  Button,
  Col,
  FloatingLabel,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import MarketFileInsert from "./MarketFileInsert";


const MarketWriteForm = () => {
  console.log("글쓰기 페이지 호출");
  const navigate = useNavigate();
  const no = window.sessionStorage.getItem("no"); //세션에 저장된 회원번호값

  const [board_mk_title, setTitle] = useState(""); //사용자가 입력한 제목 담기
  const [board_mk_pw, setPw] = useState(""); //사용자가 입력한 pw 담기
  const [mk_ticket_place, setTicketPlace] = useState(""); //판매할 티켓의 공연장소
  const [mk_ticket_date, setTicketDate] = useState(""); //판매할 티켓의 공연일
  const [mk_ticket_seat, setTicketSeat] = useState(""); //판매할 티켓의 좌석정보
  const [mk_ticket_count, setTicketCount] = useState(""); //판매할 티켓의 수량
  const [mk_ticket_price, setTicketPrice] = useState(""); //사용자가 입력한 판매가격
  const [file_name, setFilename] = useState(""); //이미지 말고 첨부파일 이름 담기
  const [file_size, setFilesize] = useState(""); //이미지 말고 첨부파일 크기 담기
  const [board_mk_content, setContent] = useState(""); //사용자가 입력한 내용 담기
  //QuillEditor이미지 선택하면 imageUploadDB타면 스프링플젝 pds 이미지 업로드
  //pds에 업로드된 파일을 읽어서 Editor안에 보여줌 imageGet?imageName=woman1.png
  const [files, setFiles] = useState([]);

  const quillRef = useRef();
  const fileRef = useRef();

  //사용자가 입력한 값을 useState에 초기화 하기
  const handleTitle = useCallback((e) => {
    setTitle(e);
  }, []);


  const handleTicketPlace = useCallback((e) => {
    setTicketPlace(e);
  }, []);

  const handleTicketDate = useCallback((e) => {
    setTicketDate(e);
  }, []);

  const handleTicketSeat = useCallback((e) => {
    setTicketSeat(e);
  }, []);

  const handleTicketCount = useCallback((e) => {
    setTicketCount(e);
  }, []);

  const handleTicketPrice = useCallback((e) => {
    setTicketPrice(e);
  }, []);

  const handleFiles = useCallback((value) => {
    setFiles([...files, value]); //deep copy
  },[files]);

  const handleContent = useCallback((value) => {
    //quilleditor에서 담김 - 태그포함된 정보
    setContent(value);
  }, []);

  //글쓰기 버튼 클릭시 등록
  const boardInsert = async () => {
    const board = {
      boardMkNo: 0, // 자동채번 시퀀스 사용
      boardMkTitle: board_mk_title,
      boardMkContent: board_mk_content,
      boardMkHit: 0,
      mkTicketPlace: mk_ticket_place,
      mkTicketDate: mk_ticket_date,
      mkTicketSeat: mk_ticket_seat,
      mkTicketCount: mk_ticket_count,
      mkTicketPrice: mk_ticket_price,
      memName: "테스트 작성자1", // 임시 - 세션스토리지로 받아올것
    };
    const res = await mk_boardInsertDB(board);
    console.log(res.data);

    navigate("/market");
  };

  /* const handleChange = async (event) => {
    console.log('첨부파일 선택'+event.target.value);
    //console.log(fileRef.current.value);
    //fileRef에서 가져온 값중 파일명만 담기
    const str = fileRef.current.value.split('/').pop().split('\\').pop()
    setFilename(str)
    console.log(str);
    //선택한 파일을 url로 바꾸기 위해 서버로 전달할 폼데이터 만들기
    const formData = new FormData()
    const file = document.querySelector("#file-input").files[0]
    formData.append("file_name", file)
    const res = await uploadFileDB(formData)
    console.log(res.data)
    const fileinfo = res.data.split(',')
    console.log(fileinfo)
    setFilename(fileinfo[0])
    setFilesize(fileinfo[1])
  }
  */

  return (
    <>
      <Sidebar />
      <div className="center">
        <Header />
        <ContainerDiv>
          <HeaderDiv>
            <div className="form-floating mb-3">
              <h3 style={{marginLeft:"450px"}}>티켓 중고판매 글 작성</h3>
            </div>
          </HeaderDiv>

          <FormDiv style={{ width: "1000px" }}>
            <hr style={{opacity:'0%'}}/>
            <div>
              <Row className="mb-4">
                <Form.Group as={Col} controlId="formGridTitle">
                  <h3>제목</h3>
                  <Form.Control
                    id="board_mk_title"
                    type="text"
                    placeholder="제목을 입력하세요."
                    style={{ width: "970px", height: "50px" }}
                    onChange={(e) => {
                      handleTitle(e.target.value);
                    }}
                  />
                </Form.Group>

              </Row>
            </div>

<hr style={{opacity:'0%'}}/>

            <div>
                  <Row className="mb-4">
                <Form.Group as={Col} controlId="formGridPlace">
                  <h3>장소</h3>
                  <Form.Control
                    id="mk_ticket_place"
                    type="text"
                    placeholder="공연 장소를 입력하세요."
                    style={{ width: "475px", height: "50px" }}
                    onChange={(e) => {
                      handleTicketPlace(e.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridDate">
                  <h3>공연일</h3>
                  <Form.Control
                    id="mk_ticket_date"
                    type="date"
                    className="form-control"
                    style={{ width: "475px", height: "50px" }}
                    onChange={(e) => {
                      handleTicketDate(e.target.value);
                    }}
                  />
                </Form.Group>
  </Row>
</div>
<hr style={{opacity:'0%'}}/>

<div>
   <Row className="mb-5">

   <Form.Group as={Col} controlId="formGridSeat">
          <h3>좌석정보</h3>
          <Form.Control type="text" id="mk_ticket_seat" placeholder="좌석 정보를 입력하세요." style={{width:'250px' , height:'50px'}} onChange={(e)=>{handleTicketSeat(e.target.value)}}/>
          </Form.Group>

        <Form.Group as={Col} controlId="formGridTicketCount">
          <h3>판매수량</h3>
          <Form.Control id="mk_ticket_count" type="number" min="1" placeholder="티켓의 수량을 입력하세요." style={{width:'250px' , height:'50px'}} onChange={(e)=>{handleTicketCount(e.target.value)}}/>
        </Form.Group>
    
        <Form.Group as={Col} controlId="formGridPrice" >
          <h3>판매등록가</h3>
          <Form.Control id="mk_ticket_price" type="text" placeholder="티켓의 판매 가격을 입력하세요." style={{width:'400px' , height:'50px'}} onChange={(e)=>{handleTicketPrice(e.target.value)}}/>
        </Form.Group>

        </Row>
      </div>
           <hr style={{opacity:'0%'}}/>

            <h3>상세내용</h3>
            <hr style={{ margin: "10px 0px 10px 0px" }} />
            <QuillEditor
              value={board_mk_content}
              handleContent={handleContent}
              quillRef={quillRef}
              files={files}
              handleFiles={handleFiles}
              onChange={(e) => {
                handleContent(e.target.value);
              }}
            />
            <MarketFileInsert files={files} />
            <hr style={{ opacity: "0%" }} />
            <Button
              onClick={() => {
                boardInsert();
              }}
            >
              글 등록하기
            </Button>
          </FormDiv>
        </ContainerDiv>
      </div>
    </>
  );
};

export default MarketWriteForm;
