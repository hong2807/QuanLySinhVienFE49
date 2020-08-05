var validation = function() {
    this.kiemTraRong = function(value,selectorError) {
        if(value.trim() === "") {
            document.querySelector(selectorError).innerHTML = 'Không được bỏ trống';
            document.querySelector(selectorError).style.display = "block";
            return false;
        }
        document.querySelector(selectorError).innerHTML = '';
        document.querySelector(selectorError).style.display = 'none';
        return true;
    }

    this.kiemTraRong = function(value,selectorError) {
        if(value.trim() === "") {
            document.querySelector(selectorError).innerHTML = 'Không được bỏ trống';
            document.querySelector(selectorError).style.display = "block";
        } 
        else {
            document.querySelector(selectorError).innerHTML = '';
            document.querySelector(selectorError).style.display = 'none';
        }
    }
    // Có 2 cách để viết:
    // 1 là dùng If else
    // 2 là cách viết tắt if else là dùng return
    // Return là trả về giá trị của hàm đó đồng thời kết thúc luôn hàm đó
    // Để thấy được cũng như sử dụng giá trị của hàm đó thì 1 là console.log 2 là dùng 1 biến toàn cục đựng giá trị 

    // Kiểm tra tên là ký tự
    this.kiemTraTatCaChuoi = function(value,selectorError) {
        var regexAllLetter = /^[a-z A-Z]+$/;
    
        if(regexAllLetter.test(value.trim())) {
            document.querySelector(selectorError).innerHTML = '';
            document.querySelector(selectorError).style.display = 'none';
            return true;
        } else {
            document.querySelector(selectorError).innerHTML = 'Không được nhập số và ký tự đặc biệt';
            document.querySelector(selectorError).style.display = "block";
            return false;
        }
    }


    // Kiểm tra email
    this.kiemTraEmail = function(value,selectorError) { 
        var regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if(regexEmail.test(value.trim())) {
            document.querySelector(selectorError).innerHTML = '';
            document.querySelector(selectorError).style.display = 'none';
            return true;
        } else {
            document.querySelector(selectorError).innerHTML = 'Email không đúng định dạng';
            document.querySelector(selectorError).style.display = "block";
            return false;
        }
    }


    // Kiểm tra nhập số điểm toán lý hóa rèn luyện
    this.kiemTraTatCaLaSo = function(value,selectorError) { 
        var regexNumber = /^[0-9]+$/;

        if(regexNumber.test(value.trim())) {
            document.querySelector(selectorError).innerHTML = '';
            document.querySelector(selectorError).style.display = 'none';
            return true;
        } else {
            document.querySelector(selectorError).innerHTML = 'Không được nhập chữ và ký tự đặc biệt';
            document.querySelector(selectorError).style.display = "block";
            return false;
        }
    }


    this.kiemTraGiaTri = function(value,selectorError,minValue,maxValue) {
        var valid = this.kiemTraTatCaLaSo(value,selectorError);
        // ???????????????????????????

        // Nếu nhỏ hơn giá trị nhỏ nhất và lớn hơn giá trị lớn nhất thì báo lỗi
        if(Number(value.trim()) < minValue || Number(value.trim()) > maxValue || !valid) {
            document.querySelector(selectorError).innerHTML = `Gía trị từ ${minValue} - ${maxValue} !`;
            document.querySelector(selectorError).style.display = "block";
            return false;
        }
        document.querySelector(selectorError).innerHTML = '';
        document.querySelector(selectorError).style.display = 'none';
        return true;
    }

    this.kiemTraDoDaiChuoi = function(value,selectorError,minLength,maxLength) {
        if(value.length < minLength || value.length > maxLength) {
            document.querySelector(selectorError).innerHTML = `Độ dài từ ${minLength} - ${maxLength} !`;
            document.querySelector(selectorError).style.display = "block";
            return false;
        }
        document.querySelector(selectorError).innerHTML = '';
        document.querySelector(selectorError).style.display = 'none';
        return true;
    }
}


