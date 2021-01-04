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


let studentName = document.getElementById('lblStudentName').textContent
let listData = document.querySelectorAll('#tblStudentMark tr');
listData = Array.from(listData);
listData = listData.slice(1, listData.length - 1);

let tongDiemQuyDoi = 0;
let tongTinChiTichLuy = 0; //ko tính thể chất và toán 1-5 (toán 1-5 giờ đã đổi tên)
let monHocDiemF = 0;  //ko tính thể chất và toán 1-5 (toán 1-5 giờ đã đổi tên)
let diemTichLuy;
let soTinA = 0, soTinB = 0, soTinC = 0, soTinD = 0, soTinF = 0;

//Đổi điểm chữ ra số : A = 4, B = 3, C = 2, D = 1, F = 0
let listPoint = ['F', 'D', 'C', 'B', 'A'];


for(let item of listData){
    item = item.querySelectorAll('td');

    if(item.length !== 0) {

        //check mấy môn thể chất và toán
        let codeSubject = item[1].textContent;
        if(codeSubject.indexOf('MATH0') === -1 && codeSubject.indexOf('GDTC') === -1) {
            let charPoint = item[13].textContent.slice(-1);
            let numPoint = listPoint.indexOf(charPoint);
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

alert(`Xin chào : ${studentName}
    Bạn có : ${soTinA} tín chỉ A
    Bạn có : ${soTinB} tín chỉ B
    Bạn có : ${soTinC} tín chỉ C
    Bạn có : ${soTinD} tín chỉ D
    Bạn có : ${soTinF} tín chỉ F - Bạn trượt : ${monHocDiemF} môn học
    Tổng số tín chỉ tích lũy : ${tongTinChiTichLuy} tín chỉ
    Điểm tích lũy của bạn : ${diemTichLuy}
    Điểm làm tròn : ${parseFloat(diemTichLuy).toFixed(2)}
`);
