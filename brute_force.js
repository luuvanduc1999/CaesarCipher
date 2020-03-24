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


function bruteForceCeasar(cipherText)
{
    var result=[];
    for (var i=0; i<26; i++)
    {
        result.push({key:i, plaintText:decryptCeasar(cipherText,i) });
    }
    console.log("Brute Force: ");
    console.log(table(result));    

}
