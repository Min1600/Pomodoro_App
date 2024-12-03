function solution(str, ending){
    let test = ""
    let end = ""
    for(let i=0; i<=ending.length; i++){
        test += str.charAt((str.length-i))
        end += ending.charAt(i)
    }
if(test.split('').reverse().join('') === end){
    return true
}else{
    return false
}
   }

   ends("abcd","bd")

   function ends(str, ending){
    if(str.endsWith(ending)){
        console.log(true)
    }else{
        console.log(false)
    }
   }