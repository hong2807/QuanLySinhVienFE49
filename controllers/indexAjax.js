var svService = new SinhVienService();

var getApiSinhVien = function() {
    var axiosAPI = {
        url:'http://svcy.myclass.vn/api/SinhVien/LayDanhSachSinhVien', 
        method: 'GET' 
    }
    
    var promise = axios(axiosAPI);

    var funcSuccess = function (result) {
        console.log(result);
        renderTableSinhVien(result.data);
    }
    
    var funcFail = function (error) {
        console.log(error);
    }
    
    promise.then(funcSuccess).catch(funcFail);
}

getApiSinhVien();


var renderTableSinhVien = function(mangSinhVien) {
    var contentTable = "";
    for(var i = 0; i < mangSinhVien.length; i++ ) {
        var sinhVien = mangSinhVien[i];
   
        var sv = new SinhVien();
        sv.maSV = sinhVien.MaSV;
        sv.tenSV = sinhVien.HoTen;
        sv.email = sinhVien.Email;
        sv.diemToan = sinhVien.DiemToan;
        sv.diemLy = sinhVien.DiemLy;
        sv.diemHoa = sinhVien.DiemHoa;
        sv.diemRenLuyen = 5;
        contentTable += `
        <tr>
            <td>${sv.maSV}</td>
            <td>${sv.tenSV}</td>
            <td>${sv.email}</td>
            <td>${sv.xepLoai()}</td>
            <td>${sv.tinhDiemTrungBinh()}</td>
            <td>${sv.diemRenLuyen}</td>
            <td><button class='btn btn-primary' onclick="chinhSuaSinhVien('${sv.maSV}')">Chỉnh sửa</button></td>
            <td><button class='btn btn-danger' onclick="xoaSinhVien('${sv.maSV}')">Xóa</button></td>
        </tr>
        `
    }
  
    document.getElementById('tableSinhVien').innerHTML = contentTable;
}



//-------------------THÊM DỮ LIỆU LÊN SERVER QUA API POST-------------------

document.getElementById('btnThemSinhVien').onclick = function() {
    var sinhVien = {
        "MaSV": document.getElementById('maSinhVien').value,
        "HoTen": document.getElementById('tenSinhVien').value,
        "Email": document.getElementById('email').value,
        "SoDT": 123456789,
        "CMND": 123456789,
        "DiemToan": document.getElementById('diemToan').value,
        "DiemLy": document.getElementById('diemLy').value,
        "DiemHoa": document.getElementById('diemHoa').value
      }
    console.log('objectData',sinhVien);
    var objectAxios = {
        url: 'http://svcy.myclass.vn//api/SinhVien/ThemSinhVien',
        method: 'POST',
        data: sinhVien 
    }

    var promise = axios(objectAxios);
    promise.then(function(result) {
        getApiSinhVien();
        console.log(result.data);
    }).catch(function(error) {
        console.log(error);
    })
}


//------------------------XÓA SINH VIÊN QUA API----------------------
var xoaSinhVien = function(maSV) {
    var promise = svService.xoaSinhVien(maSV);

    promise.then(function(result){
        getApiSinhVien();
        console.log(result.data)
    }).catch(function(error){
        console.log(error);
    })
}

//------------------------CHỈNH SỬA SINH VIÊN QUA API----------------------
var chinhSuaSinhVien = function(maSV) {
    var promise = svService.layThongTinSinhVien(maSV);

    promise.then(function(result){
        getApiSinhVien();
        // console.log(result.data)
        var sinhVienEdit = result.data;
        // Lấy dữ liệu từ server load lên lại các ô input để chỉnh sửa
        document.getElementById('maSinhVien').value = sinhVienEdit.MaSV;
        document.getElementById('tenSinhVien').value = sinhVienEdit.HoTen;
        document.getElementById('email').value = sinhVienEdit.Email;
        document.getElementById('diemToan').value = sinhVienEdit.DiemToan;
        document.getElementById('diemLy').value = sinhVienEdit.DiemLy;
        document.getElementById('diemHoa').value = sinhVienEdit.DiemHoa;

        // Khóa mã sv lại ko cho người dùng chỉnh sửa
        document.getElementById('maSinhVien').disabled = true;
    }).catch(function(error){
        console.log(error);
    })
}

//------------------------LƯU SINH VIÊN QUA API----------------------
document.getElementById('btnLuuSinhVien').onclick = function() {
    // Lấy thông tin sinh viên gắn vào data gửi lên api
    var sinhVienCapNhat = {
        "MaSV": document.getElementById('maSinhVien').value,
        "HoTen": document.getElementById('tenSinhVien').value,
        "Email":  document.getElementById('email').value,
        "SoDT": "123123123",
        "CMND": "123456789",
        "DiemToan": document.getElementById('diemToan').value,
        "DiemLy": document.getElementById('diemLy').value,
        "DiemHoa": document.getElementById('diemHoa').value
    }


    // Gọi service cập nhật dữ liệu server
    var promise = svService.capNhatSinhVien(sinhVienCapNhat);
    promise.then(function(result){
        console.log(result.data);
        // Load lại table
        getApiSinhVien();
        // Mở khóa nút thêm sinh viên
        document.getElementById('btnThemSinhVien').disabled = false;
        document.getElementById('maSinhVien').disabled = false;
        document.getElementById('btnLuuSinhVien').disabled = true;
    }).catch(function(error){
        console.log(error);
    })
    console.log(sinhVienCapNhat)
}