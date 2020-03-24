Number.prototype.mod = function(n) {
    return ((this % n) + n) % n;
}
function GCD( a, b)
{
    return b ? GCD(b, a % b) : a;
}
function findInverse(x, z)
{
    var i=1;
    while (((x*i)%z)!=1)
    {
        i++;
    }
    return i;
}


function decryptMultiplicative(cipherText, key)
{
    var alphabet=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
    cTextChar=cipherText.toLowerCase().split("");
    plainText="";

    if (GCD(key,26)!=1) return("Cannot decrypt!");
    
    var invKey=findInverse(key,26);

    for (var i=0; i<cipherText.length; i++)
        if (cTextChar[i].match("[a-z]|[A-Z]"))
            {
                cTextChar[i]=alphabet.indexOf(cTextChar[i]);
                plainText+=(alphabet[(invKey*cTextChar[i]).mod(26)]);
            }
        else    plainText+=cipherText[i];
      
    return (plainText);
    
}



function encryptMultiplicative(plainText, key)
{
    var alphabet=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    pTextChar=plainText.toUpperCase().split("");
    cipherText="";
    for (var i=0; i<plainText.length; i++)
        if (pTextChar[i].match("[a-z]|[A-Z]"))
            {
                pTextChar[i]=alphabet.indexOf(pTextChar[i]);
                cipherText+=(alphabet[(pTextChar[i]*key).mod(26)]);
            }
        else    cipherText+=plainText[i];
    return (cipherText);
    
}



