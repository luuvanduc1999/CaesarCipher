import re
import sys

def decrypt(cipherText,key):
    # bảng mã
    alphabet= ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
    
    #chuyển sang chữ thường
    cipherText=cipherText.lower()
    plainText=""

    #dịch từng kí tự
    for c in cipherText:
        if (re.match('[a-z]|[A-Z]',c)): # nếu là ký tự chữ
            plainText+= alphabet[ (alphabet.index(c)-key) %26] # dịch
        else:
            plainText+=c #nếu là ký tự dấu " =-?:!..." thì bỏ qua
    return plainText

def bruteForce(cipherText):
    result=[]
    for i in range(26): # thử tất cả các key có thể
        result.append({"Key":i,"PlainText":decrypt(cipherText,i)})
    return result
    

def freqEngCheck(text):

    alphabet=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"] #bảng mã
    englishLetterFreq = {'e': 12.70, 't': 9.06, 'a': 8.17, 'o': 7.51, 'i': 6.97, 'n': 6.75, 's': 6.33, 'h': 6.09, 'r': 5.99, 'd': 4.25, 'l': 4.03, 'c': 2.78, 'u': 2.76, 'm': 2.41, 'w': 2.36, 'f': 2.23, 'g': 2.02, 'y': 1.97, 'p': 1.93, 'b': 1.29, 'v': 0.98, 'k': 0.77, 'j': 0.15, 'x': 0.15, 'q': 0.10, 'z': 0.07} #tần suất xuất hiện thông thường
    
    text= re.sub("[^a-z|A-Z]","",text.lower())  #loại bỏ các ký tự không phải là chữ cái

    expectedCharacterCounts= [0]*27  # mảng đếm các ký tự theo lý thuyết bảng tần suấT
    for i in range(26):
        expectedCharacterCounts[i] = len(text) * (englishLetterFreq[alphabet[i]] / 100)
    
    characterCounts=[0]*27 # mảng đếm các ký tự thực tế
    for chr in text:
        characterCounts[alphabet.index(chr)]+=1

    fitness=0
    for i in range(26): 
        fitness += pow(characterCounts[i] - expectedCharacterCounts[i], 2) / expectedCharacterCounts[i] # chênh lệch giữa thực tế và lý thuyết

    return fitness



def freqAnalysis(cipherText):
    cipherText=cipherText.lower() #đưa về in thường
    fitnessMin= sys.maxsize # chênh lệch nhỏ nhất

    for i in range(26):
        tempFitness=freqEngCheck(decrypt(cipherText,i)) # phân tích tần suất với mỗi khóa key
        if (tempFitness < fitnessMin): # chênh lệch nhỏ nhất sẽ được lưu lại
            fitnessMin = tempFitness 
            shift = i
        
    return shift  #key (lần dịch) tối ưu nhất

        
def main():
    input=open("cipherText.txt","r")
    output= open("plainText.txt","w+")
    if input.mode=="r":
        text=input.read()

    # Brute Force    
    result=bruteForce(text)
    for r in result:
        tmp="Key: "+str(r['Key'])+",\nPlain text: "+r['PlainText']+"\n\n"
        output.write(tmp)
    
    #Freq Analysis
    bestShift=freqAnalysis(text)
    output.write("*-------------------------------------*\n")
    output.write("Best key: "+str(bestShift))
    output.write("\nBest plaintext: "+decrypt(text,bestShift))

    input.close()
    output.close()

    

if __name__ == "__main__":
    main()    
