## Hướng dẫn sử dụng:
### Bước 1: Các bạn truy cập trang đăng ký học chọn : Tra cứu điểm học tập 
### Bước 2: Copy đoạn code bên dưới (Ctrl + C)
### Bước 3: Mở cửa sổ console trên trình duyệt (mình dùng chorme nên click chuột phải chọn Inspect ( kiểm tra phần tử) hoặc dùng tổ hợp phím Ctrl + Shift + I)
### Sau đó chọn tab console
![alt text](https://github.com/Minhvn98/tinhDiemTichLuy/blob/master/images/image.png "Logo Title Text 1")

### Bước 4: Paste đoạn code vừa rồi (Ctrl + V)
### Bước 5: Bấm Enter và xem kết quả
```javascript
// Code chỉ đúng trên trang đkh của k60 trở về trước thôi
// Ko tính các môn thể chất
// k61 thì trường dùng trang khác 
let listData = document.querySelectorAll('#tblStudentMark tr');
listData = Array.from(listData);
listData = listData.slice(1, listData.length - 1);

let tongDiemQuyDoi = 0;
let tongTinChiTichLuy = 0; //ko tính thể chất và toán 1-5 (toán 1-5 giờ đã đổi tên)
let monHocDiemF = 0;  //ko tính thể chất và toán 1-5 (toán 1-5 giờ đã đổi tên)
let diemTichLuy;
let soTinA = 0, soTinB = 0, soTinC = 0, soTinD = 0, soTinF = 0;

//Đổi điểm chữ ra số : A = 4, B = 3, C = 2, D = 1, F = 0
function covertCharToPoint(charPoint) {
  if(charPoint === 'A')
    return 4;
  if(charPoint === 'B')
    return 3;
  if(charPoint === 'C')
    return 2;
  if(charPoint === 'D')
    return 1;
  if(charPoint === 'F')
    return 0;
}


for(let item of listData){
    item = item.querySelectorAll('td');

    if(item.length !== 0) {

        //check mấy môn thể chất và toán
        let codeSubject = item[1].textContent;
        // Code by Minh Chen nhưng do Minh ngu Regex nên dùng tạm indexof
        if(codeSubject.indexOf('MATH0') === -1 && codeSubject.indexOf('TDUC') === -1) {
            let charPoint = item[13].textContent.slice(-1);
            let numPoint = covertCharToPoint(charPoint);
            let soTinMonHoc = parseInt(item[3].textContent);

            if(numPoint === 0){
              monHocDiemF += 1;
              soTinF += soTinMonHoc;
            }
             

            if (numPoint !== 0) {
              

              if(charPoint === 'A')
                soTinA += soTinMonHoc;
              if(charPoint === 'B')
                soTinB += soTinMonHoc; 
              if(charPoint === 'C')
                soTinC += soTinMonHoc;
              if(charPoint === 'D')
                soTinD += soTinMonHoc;

              tongTinChiTichLuy += soTinMonHoc;
              tongDiemQuyDoi += (soTinMonHoc * numPoint);
            }            
        }
    }
}

diemTichLuy = tongDiemQuyDoi/tongTinChiTichLuy

alert(`Bạn trượt : ${monHocDiemF} môn học\nBạn có : ${soTinA} tín chỉ A\nBạn có : ${soTinB} tín chỉ B\nBạn có : ${soTinC} tín chỉ C\nBạn có : ${soTinD} tín chỉ D\nBạn có : ${soTinF} tín chỉ F\nTổng số tín chỉ tích lũy: ${tongTinChiTichLuy} tín chỉ\nĐiểm tích lũy của bạn: ${diemTichLuy}
      `);
      
