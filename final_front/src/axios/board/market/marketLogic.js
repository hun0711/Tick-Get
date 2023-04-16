import axios from "axios";

//마켓 게시판 게시글 조회 로직
/* export const mk_boardListDB = async () => {
  const result = await axios({
    method: "GET",
    url: "http://localhost:8888/market/mk_boardList",
  }).then((res) => res.data);
  console.log(result);
  return result;
}; */

export const mk_boardListDB = (board) => {
  console.log(board);
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: "http://localhost:8888/market/mk_boardList",
        params: board,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

//마켓 게시판 상세보기 로직
export const mk_boardDetailDB = (board) => {
  console.log(board);
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: "http://localhost:8888/market/mk_boardDetail",
        params: board, //post 방식일땐 params 대신 data
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

//마켓 게시판 글쓰기 등록 로직
export const mk_boardInsertDB = (board) => {
  console.log(board);
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "post", //@RequestBody
        url: "http://localhost:8888/market/mk_boardInsert",
        data: board, //post 방식일땐 params 대신 data
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

//마켓 게시판 글 수정 로직
export const mk_boardUpdateDB = (board) => {
  console.log(board);
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "post", //@RequestBody
        url: "http://localhost:8888/market/mk_boardUpdate",
        data: board, //post 방식일땐 params 대신 data
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

//마켓 게시판 글 삭제 로직
export const mk_boardDeleteDB = (board) => {
  console.log(board);
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: "http://localhost:8888/market/mk_boardDelete",
        params: board,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};


//마켓 게시판 판매완료 처리 로직
export const mk_boardSellDB = (board) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: "http://localhost:8888/market/mk_boardSell",
        params: board,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};




// 이미지 구현
export const uploadImageDB = (file) => {
  console.log(file);
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "post",
        url: "http://localhost:8888/market/imageUpload",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        processData: false,
        contentType: false,
        data: file,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

//첨부파일 로직
export const uploadFileDB = (file) => {
  console.log(file);
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "post",
        url: "http://localhost:8888/market/fileUpload",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        processData: false,
        contentType: false,
        data: file,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
