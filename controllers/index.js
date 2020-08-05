
// mangSinhVien: Chứa thông tin tất cả sinh viên được thêm từ form
var mangSinhVien = [];
var validate = new validation();


// Định nghĩa sự kiện cho nút hiển thị thông tin
document.getElementById('btnThemSinhVien').onclick = function(){

    // Lấy thông tin người dùng nhập từ các tag input
    var sinhVien = new SinhVien();
    sinhVien.maSV = document.getElementById('maSinhVien').value;
    sinhVien.tenSV = document.getElementById('tenSinhVien').value;
    sinhVien.loaiSV = document.getElementById('loaiSinhVien').value;
    sinhVien.email = document.getElementById('email').value;
    sinhVien.diemToan = document.getElementById('diemToan').value;
    sinhVien.diemLy = document.getElementById('diemLy').value;
    sinhVien.diemHoa = document.getElementById('diemHoa').value;
    sinhVien.diemRenLuyen = document.getElementById('diemRenLuyen').value;
    console.log(sinhVien)

    // kiểm tra dữ liệu hợp lý trước  khi thêm vào mảng
    var valid = validate.kiemTraRong(sinhVien.maSV,"#error_maSinhVien") & validate.kiemTraRong(sinhVien.tenSV,"#error_tenSinhVien") & validate.kiemTraRong(sinhVien.email,"#error_email") & validate.kiemTraRong(sinhVien.diemToan,"#error_diemToan") & validate.kiemTraRong(sinhVien.diemLy,"#error_diemLy") & validate.kiemTraRong(sinhVien.diemHoa,"#error_diemHoa") & validate.kiemTraRong(sinhVien.diemToan,"#error_diemRenLuyen");
    //  trim(): phương thức loại bỏ khoảng trắng đầu và cuối của chuỗi


    // var regexAllLetter = /^[a-z A-Z]+$/;
    // if(regexAllLetter.test(sinhVien.tenSV)) {
    //     document.querySelector('#error_tenSinhVien').innerHTML = '';
    //     document.querySelector('#error_tenSinhVien').style.display = 'none';
    // } else {
    //     document.querySelector('#error_tenSinhVien').innerHTML = 'Không đúng';
    //     document.querySelector('#error_tenSinhVien').style.display = "block";
    // }
  
    valid &= validate.kiemTraTatCaChuoi(sinhVien.tenSV,"#error_all_letter_tenSinhVien");

    // Kiểm tra email
    valid &= validate.kiemTraEmail(sinhVien.email,"#error_format_email");
   

    // Kiểm tra nhập số điểm toán lý hóa rèn luyện
    valid &= validate.kiemTraTatCaLaSo(sinhVien.diemToan,"#error_all_number_diemToan");

    // Kiểm tra giá trị
    valid &= validate.kiemTraGiaTri(sinhVien.diemToan,"#error_min_max_value_diemToan",0,10);

    // Kiểm tra độ dài chuỗi
    valid &= validate.kiemTraDoDaiChuoi(sinhVien.maSV,"#error_mix_max_length_maSinhVien",4,6);

    // push(); phương thức thêm 1 phần tử vào mangSinhVien
    mangSinhVien.push(sinhVien)
    renderTableSinhVien(mangSinhVien);
    luuLocalStorage();
    
}

var renderTableSinhVien = function (mangSV) {
    // Từ dữ liệu mảng tạo ra các thẻ tr tương ứng
    var chuoiTr = '';
    for (var index = 0; index < mangSV.length; index++) {
        //Mỗi lần duyệt xảy ra dữ liệu của 1 sinh viên trong mảng
        var sinhVien = mangSV[index];
        // Đây là bước mới khi làm Local Storage
        // Tạo object mới lấy dữ liệu từ mangSV[i] gắn qua
        var sv = new SinhVien();
        sv.maSV = sinhVien.maSV;
        sv.tenSV = sinhVien.tenSV;
        sv.email = sinhVien.email;
        sv.diemHoa = sinhVien.diemHoa;
        sv.diemLy = sinhVien.diemLy;
        sv.diemToan = sinhVien.diemToan;
        sv.diemRenLuyen = sinhVien.diemRenLuyen;
      
        // Tù dữ liệu sinh viên tạo ra từng dòng <tr> tương ứng
        // <td>${sinhVien.xepLoai()}</td>
        // <td>${sinhVien.tinhDiemTrungBinh()}</td>
        chuoiTr += `
            <tr>
                <td>${sinhVien.maSV}</td>
                <td>${sinhVien.tenSV}</td>
                <td>${sinhVien.email}</td>
                <td>${sinhVien.loaiSV}</td>
                <td>${sv.xepLoai()}</td> 
                <td>${sv.tinhDiemTrungBinh()}</td>
                <td>${sinhVien.diemRenLuyen}</td>
                <td><button class='btn btn-danger' onclick="xoaSinhVien('${sv.maSV}')">Xóa</button></td>
                
            </tr>
        
        `
    }
    // Thoát ra vòng lắp
    document.getElementById('tableSinhVien').innerHTML = chuoiTr;
}

var xoaSinhVien = function(maSV) {
    // Từ mã sinh viên sẽ tìm ra thằng sinhVien cần xóa
    // (var index = 0; index < mangSinhVien.length; index++)
    // Note lại ????
    for(var index = mangSinhVien.length; index >= 0; index++) {
        // Mỗi lần duyệt lấy ra 1 sinhVien
        var sinhVien = mangSinhVien[index];
        if(sinhVien.maSV == maSV){ //Nếu sinhVien trong mảng có mã = maSinhVien dc click
            // Tại vị trí đó mình sẽ xóa phần đó đi
            mangSinhVien.splice(index,1);
        }  
    }
    // Sau khi xóa xong tạo lại tableSinhVien
    renderTableSinhVien(mangSinhVien);
}



var luuLocalStorage = function() {
    // Biến mangSinhVien => chuỗi
    var sMangSinhVien = JSON.stringify(mangSinhVien);
    // Lưu vào localstorage
    localStorage.setItem('mangSinhVien',sMangSinhVien);
}

var layDuLieuLocalStorage = function() {
    // Nếu có localStorage mới lấy vì nếu ko kiểm tra có localStorage ko thì 1 vài browser báo lỗi nếu ko có Localstorage
    if(localStorage.getItem('mangSinhVien')) {
        // Lấy dữ liệu từ LocalStorage
        var sMangSinhVien = localStorage.getItem('mangSinhVien');
        console.log(sMangSinhVien);
        // Chuyển đổi localStorage về mảng (object) và gắn cho mangSinhVien
        mangSinhVien = JSON.parse(sMangSinhVien);
        console.log(mangSinhVien);
        // Gọi hàm render mangSinhVien => render lại table
        renderTableSinhVien(mangSinhVien);
    }
    
}

layDuLieuLocalStorage ();

