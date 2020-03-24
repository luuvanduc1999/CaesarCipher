Number.prototype.mod = function(n) {
    return ((this % n) + n) % n;
}

function decryptCeasar(cipherText, key)
{
    var alphabet=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
    cTextChar=cipherText.toLowerCase().split("");
    plainText="";
    for (var i=0; i<cipherText.length; i++)
        if (cTextChar[i].match("[a-z]|[A-Z]"))
            {
                cTextChar[i]=alphabet.indexOf(cTextChar[i]);
                plainText+=(alphabet[(cTextChar[i]-key).mod(26)]);
            }
        else    plainText+=cipherText[i];
      
    return (plainText);
    
}

function encryptCeasar(plainText, key)
{
    //bảng mã
    var alphabet=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]; 
    pTextChar=plainText.toUpperCase().split(""); //chuyển sang chữ HOA toàn bộ
    cipherText="";
    for (var i=0; i<plainText.length; i++) //duyệt tất cả
        if (pTextChar[i].match("[a-z]|[A-Z]")) //nếu là một chữ cái thì tiến hành mã hóa
            {
                pTextChar[i]=alphabet.indexOf(pTextChar[i]); //xác định mã trong bảng mã
                cipherText+=(alphabet[(pTextChar[i]+key).mod(26)]); //dịch key vị trí và xác định ký tự đó thêm vào cipherText
            }
        else    cipherText+=plainText[i]; //nếu là ký tự dấu ( ,;~!?...) thì bỏ qua
    return (cipherText); //trả về kết quả
}
