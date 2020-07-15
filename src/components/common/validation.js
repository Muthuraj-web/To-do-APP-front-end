const isEmail = (email)=>{
    const atAvailable =( email.includes("@") && 
                  email.includes(".") && 
                  email.lastIndexOf(".")> email.indexOf("@") && 
                  email.indexOf("@") === email.lastIndexOf("@")
                )
    const localPart = email.slice(0,email.indexOf("@"))
    const domainName = email.slice(email.indexOf("@"),email.lastIndexOf("."))
    const extension = email.slice(email.lastIndexOf("."))
    if(atAvailable && localPart && domainName && extension) return true
    return false
}
module.exports={
    isEmail,
}
